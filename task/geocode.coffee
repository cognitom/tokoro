gulp        = require 'gulp'
download    = require 'gulp-download'
unzip       = require 'gulp-decompress'
filter      = require 'gulp-filter'
rename      = require 'gulp-rename'
chmod       = require 'gulp-chmod'
gutil       = require 'gulp-util'
runSequence = require 'run-sequence'
fs          = require 'fs'
path        = require 'path'
csv         = require 'csv-parser'
{Iconv}     = require 'iconv'
djb         = require '../src/lib/djb'
base94      = require '../src/lib/base94'
iconv       = new Iconv 'SHIFT_JIS', 'UTF-8//TRANSLIT//IGNORE'

VERSION  = '12.0a'
BASE_URL = "http://nlftp.mlit.go.jp/isj/dls/data/#{ VERSION }"

max_djb = 0

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

gulp.task 'geocode', (cb) ->
  runSequence 'geocode:download', 'geocode:make', cb

# 国交省の街区データをダウンロードして、CSVファイルのみを保存するタスク
gulp.task 'geocode:download', ->
  download prefs.map (pref) -> url pref
  .pipe unzip strip: 1
  .pipe filter '*.{csv,CSV}' # 注: 拡張子が混在している
  .pipe rename (path) ->
    path.basename = path.basename.replace /[^\d].+$/, ''
    path.extname  = '.csv'
  .pipe chmod 644
  .pipe gulp.dest './raw/'

# ジオコードのハッシュテーブルを作成するタスク
gulp.task 'geocode:make', (callback) ->
  arr = prefs
  thenable = Promise.resolve()
  while s = arr.shift()
    do (s) -> thenable = (thenable.then -> csv2data s)
  thenable.then ->
    console.log max_djb
    callback()
  return


# パスやURLを生成する関数
url  = (pref) -> "#{ BASE_URL }/#{ pref }000-#{ VERSION }.zip"
src  = (pref) -> path.join __dirname, '..', 'raw', "#{ pref }.csv"
dist = (hash) -> path.join __dirname, '..', 'data', "#{ hash }.data"

# CSVデータを読み込んでハッシュテーブルに展開する
csv2data = (name) ->
  new Promise (resolve, reject) ->
    keylist = {}
    streamlist = [0...2000].map (i) -> fs.createWriteStream dist(i), flags: 'a'
    fs.createReadStream src name
    .pipe iconv # 文字コードをUTF-8に
    .pipe csv() # CSVをパース
    .on 'data', (record) ->
      key = record['都道府県名'] + record['市区町村名'] + record['大字・町丁目名'] + record['街区符号・地番']
      group = Math.floor(djb(key).toString().slice(-4) / 5) # 数値ハッシュの下3.5桁

      # データ内に重複がある場合はスキップ
      return if keylist[key]?
      keylist[key] = true

      hashed = djb key
      buffer = new Buffer 12
      buffer.writeUInt32BE hashed, 0
      buffer.writeUInt32BE Math.round(record['緯度'] * 1000000), 4
      buffer.writeUInt32BE Math.round(record['経度'] * 1000000), 8
      streamlist[group].write buffer

      max_djb = hashed if max_djb < hashed

    .on 'end', ->
      # 一旦閉じて、メモリ解放
      for i in [streamlist.length..1]
        streamlist[i-1].end()
        delete streamlist[i-1]
      for key, _ of keylist
        delete keylist[key]
      gutil.log "#{ name } done."
      resolve()
