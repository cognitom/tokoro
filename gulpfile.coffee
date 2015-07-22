gulp        = require 'gulp'
coffee      = require 'gulp-coffee'
download    = require 'gulp-download'
unzip       = require 'gulp-decompress'
filter      = require 'gulp-filter'
rename      = require 'gulp-rename'
chmod       = require 'gulp-chmod'
zip         = require 'gulp-zip'
runSequence = require 'run-sequence'
requireDir  = require 'require-dir'
dir         = requireDir './task'
browserSync = require 'browser-sync'
reload      = browserSync.reload

GHPAGE_URL = 'https://github.com/cognitom/tokoro/archive/gh-pages.zip'

# まとめてタスクを実行
gulp.task 'default', (cb) ->
  runSequence ['coffee', 'browserify'], 'geocode', 'zip', cb

gulp.task 'rebuild', (cb) ->
  runSequence ['coffee', 'browserify'], 'geocode:make', 'zip', cb

# ダウンロード用のZipファイル生成
gulp.task 'zip', ->
	gulp.src './data/*.data'
	.pipe zip 'data.zip'
	.pipe gulp.dest './dist/'

# スクリプトのコンパイル for Node/io.js
gulp.task 'coffee', ->
  gulp.src ['./src/**/*.coffee', '!./src/tokoro.coffee']
  .pipe coffee()
  .pipe gulp.dest './'

# サンプルページをウォッチするタスク
gulp.task 'watch', ['watchify'], ->
  browserSync.init
    notify: false
    server: baseDir: './'
  o = debounceDelay: 3000
  gulp.watch ['./src/tokoro-for-node.coffee'], o, ['coffee']
  gulp.watch ['*.html', './dist/*.js'], o, reload
