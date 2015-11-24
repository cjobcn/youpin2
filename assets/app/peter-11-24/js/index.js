requirejs.config({
  baseUrl : './js',
  paths: {
    'vue': 'vue-ninja-0.12.16.min',
    'jquery': 'jquery',
    'cookie': 'cookie',
    'area' : 'area',
    'filter-list': 'backends/filter-list-ii'
  }
});

require([
  'mods/position-nav',
  'mods/content-list',
  'mods/header',
  'mods/page-tab',
  'mods/position-content-title',
  'mods/content-side',
  'mods/publish-delegate'
], function () {});