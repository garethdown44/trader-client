var gulp        = require('gulp');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var babelify    = require('babelify');
var watchify    = require('watchify');
var exorcist    = require('exorcist');
var browserify  = require('browserify');
var browserSync = require('browser-sync').create();
var nodemon     = require('nodemon');

// Input file.
watchify.args.debug = true;
var bundler = watchify(browserify('./src/script/main.js', watchify.args));

// Babel transform
bundler.transform(babelify.configure({
    sourceMapRelative: 'src/script'
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {

  gutil.log('Compiling JS...');

  return bundler.bundle()
      .on('error', function (err) {
          gutil.log(err.message);
          browserSync.notify("Browserify Error!");
          this.emit("end");
      })
      .pipe(exorcist('dist/js/bundle.js.map'))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./dist/js'))
      .pipe(browserSync.stream({once: true}));
}

/**
 * Gulp task alias
 */
gulp.task('bundle', function () {
  return bundle();
});

var CSS_DEST = 'dist/css/'
gulp.task('css', function() {
  gulp.src('src/styles/**/*.css')
    .pipe(gulp.dest(CSS_DEST));
});

gulp.task('views', function() {
  gulp.src('src/*.html').pipe(gulp.dest('dist/'));
});

/**
 * First bundle, then serve from the ./app directory
 */
gulp.task('default', ['views', 'bundle'], function () {
  browserSync.init({
      server: "./dist"
  });
  gulp.watch([ 'src/styles/**/*.css' ], [ 'css' ]);
});

// gulp.task('serve', function() {
//   nodemon({
//     script: 'server.coffee',
//     ext: 'json js coffee',
//     ignore: [ 'dist/*', 'src/*' ] })
//     .on('change', function() {})
//     .on('restart', function() { console.log('Restarted webserver') }) });