requirejs.config({
  baseUrl: './',
  paths: {
    jquery: '../../jquery',
    vue: '../../vue'
  }
});

require([
  '../header/index',
  '../copyright/index'
], function (header, copyright) {
  header.show();
  copyright.show();
}, function (err) {
  throw err;
});
