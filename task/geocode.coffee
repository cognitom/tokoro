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
perfect     = require 'perfect'
csv         = require 'csv-parser'
{Iconv}     = require 'iconv'
djb         = require '../src/lib/djb'
base94      = require '../src/lib/base94'
iconv       = new Iconv 'SHIFT_JIS', 'UTF-8//TRANSLIT//IGNORE'

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

gulp.task 'geocode', (cb) ->
  runSequence 'geocode:download', 'geocode:shuffle', 'geocode:perf', cb

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
gulp.task 'geocode:shuffle', (callback) ->
  arr = prefs
  thenable = Promise.resolve()
  while s = arr.shift()
    do (s) -> thenable = (thenable.then -> shuffle s)
  thenable.then -> callback()
  return

gulp.task 'geocode:perf', (callback) ->
  thenable = Promise.resolve()
  for grp in [0...2000]
    do (grp) -> thenable = (thenable.then -> makePerf grp.toString())
  thenable.then -> callback()
  return


# パスやURLを生成する関数
url = (pref) -> "#{ BASE_URL }/#{ pref }000-#{ VERSION }.zip"
getPath = (dir, name, ext) -> path.join __dirname, '..', dir, "#{ name }.#{ ext }"

# CSVデータを読み込んで中間ファイルを出力
# ※一気にやるとメモリが足りなくなるため
shuffle = (name) ->
  new Promise (resolve, reject) ->
    keylist = {}
    streamlist = [0...2000].map (i) ->
      fs.createWriteStream getPath('inter', i, 'csv'), flags: 'a'

    fs.createReadStream getPath 'src', name, 'csv'
    .pipe iconv # 文字コードをUTF-8に
    .pipe csv() # CSVをパース
    .on 'data', (record) ->
      key = record['都道府県名'] + record['市区町村名'] + record['大字・町丁目名'] + record['街区符号・地番']
      group = Math.floor(djb(key).toString().slice(-4) / 5) # 数値ハッシュの下3.5桁
      # データ内に重複がある場合はスキップ
      return if keylist[key]?
      keylist[key] = true
      # スペース区切りで出力
      streamlist[group].write "#{ key },#{ record['緯度'] },#{ record['経度'] }\n"

    .on 'end', ->
      # 一旦閉じて、メモリ解放
      for i in [streamlist.length..1]
        streamlist[i-1].end()
        delete streamlist[i-1]
      for key, _ of keylist
        delete keylist[key]
      gutil.log "#{ name } done."
      resolve()

# 最小完全ハッシュを作って、バイナリ保存
makePerf = (grp) ->
  new Promise (resolve, reject) ->
    dict = {}
    fs.createReadStream getPath 'inter', grp, 'csv'
    .pipe csv headers: ['key', 'lat', 'long'] # CSVをパース
    .on 'data', (record) ->
      dict[record.key] = [record.lat, record.long]
    .on 'end', ->
      tables = perfect.create dict
      stream = fs.createWriteStream getPath 'data', grp, 'data'
      for i in [0...tables[0].length]
        buffer = new Buffer 10
        buffer.writeInt16BE (tables[0][i] || 0), 0
        buffer.writeUInt32BE Math.round(tables[1][i][0] * 1000000), 2
        buffer.writeUInt32BE Math.round(tables[1][i][1] * 1000000), 6
        stream.write buffer
      stream.end()
      gutil.log "#{ grp } done."
      resolve()
