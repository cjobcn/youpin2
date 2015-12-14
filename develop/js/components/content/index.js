define([
  'vue',
  'jquery',
  '../my-position/index',
  '../delegate-position/index'
], function (Vue, $, myPosition, delegatePosition) {
  var content = {};
  content.myPosition = myPosition;
  content.delegatePosition = delegatePosition;
  content.content =  new Vue({
    el: '#content',
    data: {
      active: false,
      myPosition: myPosition,
      delegatePosition: delegatePosition
    },
    methods: {
      show: function () {
        this.active = true;
      },
      hide: function () {
        this.active = false;
      }
    },
    events : {
      'edit-note': function (item) {
        console.log('edit-note');
        //this.active = false;
      }
    }
  });
  return content;
});
