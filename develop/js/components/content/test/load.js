requirejs.config({
  baseUrl: '../',
  paths: {
    jquery: '../../jquery',
    vue: '../../vue'
  }
});

require(['./index'], function (mod) {
  //mod.show();
}, function (err) {
  throw err;
});
