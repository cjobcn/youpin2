requirejs.config({
  baseUrl: './',
  paths: {
    jquery: '../../jquery',
    vue: '../../vue'
  }
});

require(['./index'], function (mod) {
  // selector ...
  selector = '#pagination';

  mod = mod(selector);
  mod.setLen(50);
  mod.show();
  mod.$on('change-index', function (index) {
    console.log(index);
  });
  mod.$on('exceed-index', function (index) {
    this.pass = true;
  });

}, function (err) {
  throw err;
});
