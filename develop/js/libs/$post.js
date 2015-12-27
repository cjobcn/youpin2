define(['jquery'], function ($) {
  return function (opts, done, fail) {
    $.ajax($.extend(true, { "type": "post", url: "", data: {} }, opts))
    .done(done)
    .fail(fail);
  }
});
