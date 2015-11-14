module.exports = function (gulp, opts) {
  var urls = opts.workUrls.findUrl('jade');
  gulp.task('jade', function() {
    return gulp.src(urls.src)
      .pipe(opts.changed(urls.out))
      .pipe(opts.jade({pretty: true}))
      .pipe(gulp.dest(urls.out))
      .pipe(opts.livereload())
      .pipe(opts.notify({message : urls.message || 'jade'}));
  });
};