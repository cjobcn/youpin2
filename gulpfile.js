var gulp = require('gulp');
var livereload = require('gulp-livereload');
var sass = require('gulp-ruby-sass');
var jade = require('gulp-jade');
var notify = require("gulp-notify");
var changed = require('gulp-changed');
var path = require('path');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// require('./libs/file-helper.js').writeSassFiles();
//  gulp.task('sass', function () {
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
  // gulp.watch('./assets/sass/**/*.scss', ['sass']);
  gulp.watch('./assets/jade/**/*.jade', ['jade']);
});

gulp.task('default', function () {
  // gulp.start('minify-css', 'concat', 'images', 'jade', 'watch');
  gulp.start('watch');
});

// gulp serve
// 监视文件改动并重新载入
// gulp.task('serve', function() {
//   browserSync({
//     server: {
//       baseDir: 'app'
//     }
//   });

//   gulp.watch(['*.jade'], {cwd: 'assets/jade'}, reload);
//   // gulp.watch('app/scss/*.scss', ['sass']);
// });

// var browserSync = require('browser-sync');
// var reload = browserSync.reload;

// gulp.task('sass', function() {
//   return sass('scss/styles.scss')
//     .pipe(gulp.dest('app/css'))
//     .pipe(reload({ stream:true }));
// });

// // 监视 Sass 文件的改动，如果发生变更，运行 'sass' 任务，并且重载文件
// gulp.task('serve', ['sass'], function() {
//   browserSync({
//     server: {
//       baseDir: 'app'
//     }
//   });

//   gulp.watch('app/scss/*.scss', ['sass']);
// });
