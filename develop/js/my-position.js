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
  '../js/my-position/index'
], function ($, page) {
  // ------------------------
  page.header.show();
  page.header.setTabIndex(0);

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
        alert('now is my position page, no change !');
        break;
      case 1:
        var target = (window.location + '').replace(/my\-position/, 'delegate-position');
        alert('now go to delegate position page!');
        window.location = target;
        break;
      case 2:
        alert('now go to talent lib page!');
        break;
      case 3:
        alert('now go to company management page!');
        break;
    }
  });
}, function (err) {
  throw err;
});
