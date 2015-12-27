requirejs.config({
  baseUrl: './',
  paths: {
    jquery: '../js/libs/jquery',
    vue: '../js/libs/vue'
  }
});

require(['../js/form/custom'], function (){});
