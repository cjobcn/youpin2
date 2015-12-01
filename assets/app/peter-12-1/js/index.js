  requirejs.config({
  paths: {
    'vue': './vue',
    'jquery': './jquery'
  }
});

require([
  'mods/content-list',
  'mods/content-side',
  'mods/header',
  'mods/page-tab',
  'mods/position-nav',
  'mods/publish-delegate',
  'mods/copyright'
], function () {});
