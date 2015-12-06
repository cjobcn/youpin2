define(function () {
  return function walker(item, callback, base) {
    if (item == null)
      return;

    if (base == null)
      base = 1;

    callback(item, base);

    if ($.isArray(item.sub)) item.sub.forEach(function (one) {
      if (one && one.sub)
        walker(one, callback, base + 1);
      else
        callback(one, base + 1);
    });
  };
});
