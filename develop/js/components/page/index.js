requirejs.config({
  baseUrl: './',
  paths: {
    jquery: '../../jquery',
    vue: '../../vue'
  }
});

require([
  'jquery',
  '../header/index',
  '../nav/index',
  '../content/index',
  '../copyright/index',
  '../position-edit/index'
], function ($, header, nav, content, copyright, positionEdit) {
  // ------------------------
  header.show();
  nav.show();
  content.show();
  copyright.show();

  // ------------------------
  var $screenCover = $('.screen-cover');
  content.$on('edit-note', function () {
    console.log('locking the screen !');
    $screenCover.removeClass('hidden');
    positionEdit.show();
  });
}, function (err) {
  throw err;
});
