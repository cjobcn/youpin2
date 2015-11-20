requirejs.config({
  baseUrl : './js',
  paths: {
    vue: 'vue-0.12.16.min',
    jquery: 'jquery',
    cookie: 'cookie',
    jade: 'jade-runtime',
    'backends-list' : 'backends/position-list',
    'filter-list' : 'backends/filter-list',
    'area' : 'area'
  }
});

require([
  'mods/content-item',
  'backends-list',
  'mods/header',
  'mods/page-tab',
  'mods/position-content-title',
  'mods/position-nav',
  'mods/foot',
  'mods/pagination',
  'mods/content-side',
  'mods/publish-delegate'
], function (item, backendsList) {
  $(function () {
    item.getPositionList()
    .done(function (res) {
      var locals = item.translatePosted(res);
      item.render(locals);
    })
    .fail(function (xhr, err) {
      console.log('==================================');
      var locals = item.translatePosted(backendsList);
      item.render(locals);
    });
  });
});