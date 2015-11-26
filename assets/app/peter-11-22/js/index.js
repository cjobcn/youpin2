requirejs.config({
  baseUrl : './js',
  paths: {
    'vue': 'vue-ninja-0.12.16.min',
    'jquery': 'jquery',
    'cookie': 'cookie',
    'area' : 'area'
  }
});

require([
  'mods/position-nav',
  'mods/content-item',
  'mods/header',
  'mods/page-tab',
  'mods/position-content-title',
  'mods/foot',
  'mods/pagination',
  'mods/content-side',
  'mods/publish-delegate'
], function () {});