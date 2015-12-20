define(function () {
  return function walker(item, callback, base) {
    if (item == null)
      return;

    if (base == null)
      base = 1;

    if (callback(item, base) === false)
      return false;

    if (!$.isArray(item.sub))
      return;

    var i = -1;
    var len = item.sub.length;
    var one;
    while (++i < len) {
      one = item.sub[i];
      if (one && one.sub) {
        if (walker(one, callback, base + 1) === false)
          return false;
      } else if (callback(one, base + 1) === false) {
        return false;
      }
    }
  };
});
