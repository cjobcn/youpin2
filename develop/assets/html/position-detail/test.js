requirejs.config({
  baseUrl: './',
  paths: {
    jquery: '../../jquery',
    vue: '../../vue'
  }
});

require([
  '../../components/header/index',
  '../../components/copyright/index'
], function (header, copyright) {
  header.show();
  copyright.show();
}, function (err) {
  throw err;
});
