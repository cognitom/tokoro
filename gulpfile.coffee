gulp        = require 'gulp'
coffee      = require 'gulp-coffee'
download    = require 'gulp-download'
unzip       = require 'gulp-decompress'
filter      = require 'gulp-filter'
rename      = require 'gulp-rename'
chmod       = require 'gulp-chmod'
runSequence = require 'run-sequence'
requireDir  = require 'require-dir'
dir         = requireDir './task'
browserSync = require 'browser-sync'
reload      = browserSync.reload

GHPAGE_URL = 'https://github.com/cognitom/tokoro/archive/gh-pages.zip'

# まとめてタスクを実行
gulp.task 'default', (cb) ->
  runSequence 'coffee', 'browserify', 'geocode', cb

gulp.task 'rebuild', (cb) ->
  runSequence 'coffee', 'browserify', 'geocode:make', cb

# 作成済みのデータをGitHub Pagesからダウンロード (10分ほどかかります)
gulp.task 'download', (cb) ->
  download GHPAGE_URL
  .pipe unzip strip: 2
  .pipe filter '*.data'
  .pipe chmod 644
  .pipe gulp.dest './data/'

# スクリプトのコンパイル for Node/io.js
gulp.task 'coffee', ->
  gulp.src './src/tokoro-for-node.coffee'
  .pipe coffee()
  .pipe gulp.dest './dist/'

# サンプルページをウォッチするタスク
gulp.task 'watch', ['watchify'], ->
  browserSync.init
    notify: false
    server: baseDir: './'
  o = debounceDelay: 3000
  gulp.watch ['./src/tokoro-for-node.coffee'], o, ['coffee']
  gulp.watch ['*.html', './dist/*.js'], o, reload
