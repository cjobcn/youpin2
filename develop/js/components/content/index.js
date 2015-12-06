define([
  'vue',
  'jquery',
  './js/my-position',
  './js/delegate-position'
], function (Vue, $, myPosition, delegatePosition) {
  return {
    myPosition: myPosition,
    delegatePosition: delegatePosition
  };
});
