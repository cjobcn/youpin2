var gulp = require('gulp');
var livereload = require('gulp-livereload');
var sass = require('gulp-ruby-sass');
var jade = require('gulp-jade');
var notify = require("gulp-notify");
var changed = require('gulp-changed');
var path = require('path');

// gulp.task('sass', function () {
//    return sass('./assets/sass/**/*.scss', {
//        stopOnError: true,
//        // output the cache, so this would not affect the git
//        cacheLocation: path.join(__dirname, './.sass-cache')
//        // this is the output dir
//        // tempDir : path.join(__dirname, '.')
//      })
//      .pipe(changed('./assets/stylesheets'))
//      .on('error', sass.logError)
//      .pipe(gulp.dest('./assets/stylesheets'))
//      .pipe(livereload())
//      .pipe(notify({message : 'sass'}));
// });

gulp.task('jade', function() {
  return gulp.src('./assets/jade/**/*.jade')
    .pipe(changed('./assets/htmls'))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('./assets/htmls'))
    .pipe(livereload())
    .pipe(notify({message : 'jade'}));
});

gulp.task('watch', function() {
  livereload.listen();
  // this will fail
  gulp.watch('./assets/sass/**/*.scss', ['sass']);
  gulp.watch('./assets/jade/**/*.jade', ['jade']);
});

// this is cool
gulp.task('default', function () {
  gulp.start('watch');
});
