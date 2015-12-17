requirejs.config({
  baseUrl: './',
  paths: {
    jquery: '../../jquery',
    vue: '../../vue'
  }
});

require(['./index'], function (mod) {
  mod.content.show();
  mod.myPosition.show();
  //mod.myPosition.hide();
  //mod.delegatePosition.show();
}, function (err) {
  throw err;
});
