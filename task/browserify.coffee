gulp       = require 'gulp'
rename     = require 'gulp-rename'
browserify = require 'browserify'
watchify   = require 'watchify'
coffeeify  = require 'coffeeify'
source     = require 'vinyl-source-stream'
buffer     = require 'vinyl-buffer'
uglify     = require 'gulp-uglify'
#sourcemaps = require 'gulp-sourcemaps'
path       = require 'path'
gutil      = require 'gulp-util'

$ =
  src:  './src/tokoro.coffee'
  dist: './dist/'

b = browserify
  extensions: ['.js', '.coffee']
  debug: true
  cache: {} # for watchify
  packageCache: {} # for watchify
.transform coffeeify
.add $.src

gulp.task 'browserify', -> bundle b

gulp.task 'watchify', ->
  w = watchify b
  .on 'update', (ids) -> bundle w
  .on 'log', gutil.log
  bundle w

bundle = (bundler) ->
  bundler.bundle()
  .on 'error', gutil.log.bind gutil, 'Browserify Error'
  .pipe source "#{ path.basename $.src, '.coffee' }.js"
  .pipe buffer()
  .pipe gulp.dest $.dist
  .pipe rename extname: '.min.js'
  #.pipe sourcemaps.init loadMaps: true
  .pipe uglify()
  #.pipe sourcemaps.write './'
  .pipe gulp.dest $.dist
