gulp     = require 'gulp'
download = require 'gulp-download'
unzip    = require 'gulp-decompress'
filter   = require 'gulp-filter'
rename   = require 'gulp-rename'
chmod    = require 'gulp-chmod'
fs       = require 'fs'
path     = require 'path'
csv      = require 'csv-parser'
through  = require 'through2'
{Iconv}  = require 'iconv'
djb      = require './lib/djb'
base94   = require './lib/base94'
iconv    = new Iconv 'SHIFT_JIS', 'UTF-8//TRANSLIT//IGNORE'

VERSION  = '12.0a'
BASE_URL = "http://nlftp.mlit.go.jp/isj/dls/data/#{ VERSION }"

prefs = ''
prefs += ' 01'                         # 北海道
prefs += ' 02 03 04 05 06 07'          # 東北
prefs += ' 08 09 10 11 12 13 14'       # 関東
prefs += ' 15 16 17 18 19 20 21 22 23' # 中部
prefs += ' 24 25 26 27 28 29 30'       # 近畿
prefs += ' 31 32 33 34 35'             # 中国
prefs += ' 36 37 38 39'                # 四国
prefs += ' 40 41 42 43 44 45 46 47'    # 九州
prefs = prefs.trim().split(' ')

# 国交省の街区データをダウンロードして、CSVファイルのみを保存するタスク
gulp.task 'download', ->
  download prefs.map (pref) -> url pref
  .pipe unzip strip: 1
  .pipe filter '*.{csv,CSV}' # 注: 拡張子が混在している
  .pipe rename (path) ->
    path.basename = path.basename.replace /[^\d].+$/, ''
    path.extname  = '.csv'
  .pipe chmod 755
  .pipe gulp.dest './raw/'

# ジオコードのハッシュテーブルを作成
gulp.task 'geocode', (callback) ->
  arr = prefs
  thenable = Promise.resolve()
  while s = arr.shift()
    do (s) -> thenable = (thenable.then -> csv2data s)
  thenable.then callback
  return

url  = (pref) -> "#{ BASE_URL }/#{ pref }000-#{ VERSION }.zip"
src  = (pref) -> path.join __dirname, 'raw', "#{ pref }.csv"
dist = (hash) -> path.join __dirname, 'data', "#{ hash }.data"

# CSVデータを読み込んでハッシュテーブルに展開する
csv2data = (name) ->
  new Promise (resolve, reject) ->
    prev      = ''
    keylist   = {} # 重複除去のため
    hashlist  = {} # ハッシュの衝突検知のため
    wstream   = null
    collision = 0

    fs.createReadStream src name
    .pipe iconv # 文字コードをUTF-8に
    .pipe csv() # CSVをパース
    .on 'data', (record) ->
      key = record['都道府県名'] + record['市区町村名'] + record['大字・町丁目名'] + record['街区符号・地番']
      group = record['都道府県名'] + record['市区町村名']

      if prev != group
        console.log (djb group), group
        wstream.end() if wstream
        keylist  = {}
        hashlist = {}
        wstream   = fs.createWriteStream dist djb group
        prev      = group

      # データ内に重複がある場合はスキップ
      return if keylist[key]?
      keylist[key] = true

      digest = base94.encode djb key
      lat    = base94.encode record['緯度'] * 1000000
      long   = base94.encode record['経度'] * 1000000

      # ハッシュに衝突があっても止めない。今後、衝突数を減らすようハッシュ関数を調整する。
      if hashlist[digest]?
        collision++
        return
      hashlist[digest] = true

      wstream.write "#{ digest } #{ lat } #{ long }\n" # スペース区切りで出力
    .on 'end', ->
      console.log "ハッシュに#{ collision }件の衝突がありました"
      wstream.end() if wstream
      resolve()
