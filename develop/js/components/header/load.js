requirejs.config({
  baseUrl: './',
  paths: {
    jquery: '../../jquery',
    vue: '../../vue'
  }
});

require(['./index'], function (mod) {
  console.log(!!mod);
}, function (err) {
  throw err;
});
