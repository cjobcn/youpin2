requirejs.config({
  baseUrl: './',
  paths: {
    jquery: '../../jquery',
    vue: '../../vue'
  }
});

require([
  'jquery'
], function ($) {
}, function (err) {
  throw err;
});
