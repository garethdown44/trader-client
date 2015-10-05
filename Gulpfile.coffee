gulp = require('gulp')
jshint = require('gulp-jshint')
source = require('vinyl-source-stream')
browserify = require('browserify')
concat = require('gulp-concat')
autoprefixer = require('gulp-autoprefixer')
refresh = require('gulp-livereload')
nodemon = require('gulp-nodemon')
coffee = require('gulp-coffee')
gutil = require('gulp-util')
changed = require('gulp-changed')

gulp.task 'serve', ->
  nodemon(
    script: 'server.coffee'
    ext: 'json js coffee'
    ignore: [ 'public/*', 'client/*' ])
    .on 'change', []
    .on 'restart', ->
      console.log 'Restarted webserver'

# Dev task
gulp.task 'dev', [
  'views'
  'lib-js'
  'lib-css'
  'css'
  'browserify'
  'watch'
], ->
# JSLint task - todo convert to coffeelint
gulp.task 'lint', ->
  gulp.src('client/scripts/*.js').pipe(jshint()).pipe jshint.reporter('default')
  return

gulp.task 'lib-js', ->
  gulp.src 'client-lib/js/**/*.*'
    .pipe gulp.dest 'public/js/'

CSS_DEST = 'public/css/'
gulp.task 'css', ->
  gulp.src 'client/styles/**/*.css'
    .pipe changed(CSS_DEST)
    .pipe gulp.dest(CSS_DEST)

gulp.task 'lib-css', ->
  DEST = 'public/css/'
  gulp.src 'client-lib/css/**/*.css'
    .pipe changed(CSS_DEST)
    .pipe gulp.dest(CSS_DEST)

# Browserify task
gulp.task 'browserify', ->
  bundleStream = browserify(
    entries: [ './client/script/main.js' ]
    extensions: [
      '.js'
    ]
    debug: true)
  .transform('babelify')
  .bundle()
  .pipe(source('bundle.js'))
  bundleStream.pipe gulp.dest('./public/js')

# Views task
gulp.task 'views', ->
  # Get our index.html
  gulp.src('client/*.html').pipe gulp.dest('public/')
  # Any other view files from client/views
  gulp.src('client/views/**/*').pipe gulp.dest('public/views/')
  
gulp.task 'watch', [ 'serve' ], ->
  refresh.listen()

  # Watch our scripts, and when they change run lint and browserify
  gulp.watch [
    'client/script/**/*.js'
  ], [ 'browserify' ]

  gulp.watch [ 'client/styles/**/*.css' ], [ 'css' ]

  # Watch view files
  gulp.watch [ 'client/**/*.html' ], [ 'views' ]
  gulp.watch('./public/**').on 'change', refresh.changed
  
gulp.task 'default', [ 'dev' ]