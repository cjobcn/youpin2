module.exports = function (gulp, opts) {
  gulp.task('watch', function() {
    opts.livereload.listen();
    var len = opts.workUrls.filter(function (one) {
      if (one.src && one.out && one.name)
        gulp.watch(one.src, [one.name]);
      return one.src && one.out && one.name;
    }).length;
    if (!len)
      throw new Error('no workUrls to watch, or lose: src | out | name');
  });
};