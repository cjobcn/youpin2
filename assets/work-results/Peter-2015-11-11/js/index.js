requirejs.config({
  baseUrl : './js',
  paths : {
    vue : 'vue.min-0.12.16',
    jquery : 'jquery'
  }
});

require([
  'modules/header',
  'modules/my-position-content-title',
  'modules/position-nav-main',
  'modules/site-tab-title',
  'jquery'
], function (
    header,
    myPositionContentTitle,
    positionNavMain,
    siteTabTitle,
    $
) {
    console.log(!!header);
    console.log(!!myPositionContentTitle);
    console.log(!!positionNavMain);
    console.log(!!siteTabTitle);
    console.log(!!$);
});