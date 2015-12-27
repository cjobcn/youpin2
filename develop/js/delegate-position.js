requirejs.config({
  baseUrl: './',
  paths: {
    jquery: '../js/libs/jquery',
    vue: '../js/libs/vue'
  },
  shim: {
    '../js/nav': ['../js/header']
  }
});

require([
  'jquery',
  '../js/delegate-position/index'
], function ($, page) {
  // ------------------------
  page.header.show();
  page.header.setTabIndex(1);

  page.nav.show();
  page.contentSection.list[0].show();

  page.copyright.show();

  // ------------------------------------------------
  var $screenCover = $('.screen-cover');

  // ------------------------------------------------
  page.contentSection.list[0].$on('edit-note', function () {
    $screenCover.removeClass('hidden');
    page.positionEdit.show();
  });

  // ------------------------------------------------
  page.positionEdit.$on('clickBtn', function () {
    $screenCover.addClass('hidden');
    page.positionEdit.hide();
  });

  // ------------------------------------------------
  page.header.$on('change', function (i) {
    switch (i) {
      case 0:
        var target = (window.location + '').replace(/delegate\-position/, 'my-position');
        window.alert('now go to my position page!');
        window.location = target;
        break;
      case 1:
        window.alert('now is delegate position page, no change !');
        break;
      case 2:
        window.alert('now go to talent lib page!');
        break;
      case 3:
        window.alert('now go to company management page!');
        break;
    }
  });
}, function (err) {
  throw err;
});

