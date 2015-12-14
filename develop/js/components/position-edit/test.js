requirejs.config({
  baseUrl: './',
  paths: {
    jquery: '../../jquery',
    vue: '../../vue'
  }
});

require([
  '../header/index',
  '../copyright/index',
  "./index"
], function (header, copyright, pe) {
  header.show();
  pe.show();
  copyright.show();
}, function (err) {
  throw err;
});
