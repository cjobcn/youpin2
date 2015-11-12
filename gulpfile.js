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

var watched = './assets/work-results/Peter-2015-11-11/jade/**/*.jade';
var out = './assets/work-results/Peter-2015-11-11';

gulp.task('jade', function() {
  return gulp.src(watched)
    .pipe(changed(out))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(out))
    .pipe(livereload())
    .pipe(notify({message : 'jade'}));
});

gulp.task('watch', function() {
  livereload.listen();
  // gulp.watch('./assets/sass/**/*.scss', ['sass']);
  gulp.watch(watched, ['jade']);
});

gulp.task('default', function () {
  gulp.start('watch');
});