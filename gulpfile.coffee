gulp        = require 'gulp'
coffee      = require 'gulp-coffee'
runSequence = require 'run-sequence'
requireDir  = require 'require-dir'
dir         = requireDir './task'
browserSync = require 'browser-sync'
reload      = browserSync.reload

# まとめてタスクを実行
gulp.task 'default', (cb) ->
  runSequence 'coffee', 'browserify', 'geocode', cb

gulp.task 'rebuild', (cb) ->
  runSequence 'coffee', 'browserify', 'geocode:make', cb

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
