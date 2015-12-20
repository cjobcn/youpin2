requirejs.config({
  baseUrl: './',
  paths: {
    jquery: '../../jquery',
    vue: '../../vue'
  }
});

require([
  'jquery',
  './index'
], function ($, page) {
  // ------------------------
  page.header.show();
  page.nav.show();
  page.contentSection.content.show();
    page.contentSection.myPosition.show();
  page.copyright.show();

  // ------------------------------------------------
  var $screenCover = $('.screen-cover');

  // ------------------------------------------------
  page.contentSection.myPosition.$on('edit-note', function () {
    $screenCover.removeClass('hidden');
    page.positionEdit.show();
  });

  // ------------------------------------------------
  page.contentSection.delegatePosition.$on('edit-note', function () {
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
        page.contentSection.myPosition.show();
        page.contentSection.delegatePosition.hide();
        break;
      case 1:
        page.contentSection.myPosition.hide();
        page.contentSection.delegatePosition.show();
        break;
    }
  });
}, function (err) {
  throw err;
});
