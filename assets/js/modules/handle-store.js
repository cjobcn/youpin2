define(function () {
  var KEY = 'todos-heyhey';
  return function (opts) {
    return opts.get
      ? JSON.parse(window.localStorage.getItem(KEY) || '[]')
      : opts.set && opts.list
      ? window.localStorage.setItem(KEY, JSON.stringify(opts.list))
      : null;
  }
 // window.handleStore({set: true, list : []});
});
