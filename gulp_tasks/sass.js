module.exports = function (gulp, opts) {
  var urls = opts.workUrls.findUrl('sass');
  gulp.task('sass', function() {
    return opts.sass(urls.src, {
        stopOnError: true,
        // output the cache, so this would not affect the git
        // cacheLocation: path.join(__dirname, './.sass-cache')
        // this is the output dir
        // tempDir : path.join(__dirname, '.')
      })
      .pipe(opts.changed(urls.out))
      .on('error', opts.sass.logError)
      .pipe(gulp.dest(urls.out))
      .pipe(opts.livereload())
      .pipe(opts.notify({message : urls.message || 'sass'}));
  });
};