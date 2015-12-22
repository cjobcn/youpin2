requirejs.config({
  baseUrl: './',
  paths: {
    jquery: '../../jquery',
    vue: '../../vue',
    post: '../../components/_base/js/post',
    $post: '../../components/_base/js/$post'
  }
});

require([
  '../../components/header/index',
  '../../components/copyright/index',
  './index'
], function (header, copyright, positionDetail) {
  header.show();
  copyright.show();
}, function (err) {
  throw err;
});

