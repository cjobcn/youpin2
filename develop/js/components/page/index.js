requirejs.config({
  baseUrl: './',
  paths: {
    jquery: '../../jquery',
    vue: '../../vue'
  }
});

require([
  '../header/index',
  '../nav/index',
  '../content/index',
  '../copyright/index'
], function (header, nav, content, copyright) {
  // ------------------------
  header.show();
  nav.show();
  content.show();
  copyright.show();
  // ------------------------
}, function (err) {
  throw err;
});
