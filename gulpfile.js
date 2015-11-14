var gulp = require('gulp');
var livereload = require('gulp-livereload');
var sass = require('gulp-ruby-sass');
var jade = require('gulp-jade');
var notify = require("gulp-notify");
var changed = require('gulp-changed');
var path = require('path');

var workUrls = [
  {
    name : 'jade',
    src : './assets/jade/**/*.jade',
    out : './assets/htmls',
    message : ''
  },
  {
    name : 'sass',
    src : './assets/sass/**/*.scss',
    out : './assets/stylesheets',
    message : ''
  }
];
workUrls.findUrl = function (name) {
  var i = -1;
  var ret;
  while (++i < workUrls.length) {
    if (workUrls[i] && workUrls[i].name === name) {
      ret = workUrls[i];
      break;
    }
  }

  if (!ret)
    throw new Error('no urls for the given name: ' + name);
  return ret;
};

gulp.task('jade', function() {
  var urls = workUrls.findUrl('jade');

  return gulp.src(urls.src)
    .pipe(changed(urls.out))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(urls.out))
    .pipe(livereload())
    .pipe(notify({message : urls.message || 'jade'}));
});

gulp.task('sass', function () {
  var urls = workUrls.findUrl('sass');

   return sass(urls.src, {
       stopOnError: true,
       // output the cache, so this would not affect the git
       // cacheLocation: path.join(__dirname, './.sass-cache')
       // this is the output dir
       // tempDir : path.join(__dirname, '.')
     })
     .pipe(changed(urls.out))
     .on('error', sass.logError)
     .pipe(gulp.dest(urls.out))
     .pipe(livereload())
     .pipe(notify({message : urls.message || 'sass'}));
});

gulp.task('watch', function() {
  livereload.listen();
  var len = workUrls.filter(function (one) {
    if (one.src && one.out && one.name)
      gulp.watch(one.src, [one.name]);
    return one.src && one.out && one.name;
  }).length;
  if (!len)
    throw new Error('no workUrls to watch, or lose: src | out | name');
});

gulp.task('default', function () {
  gulp.start('watch');
});