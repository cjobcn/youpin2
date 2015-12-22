define([
  'vue',
  'jquery'
], function (Vue, $) {
  return new Vue({
    el: '#content',
    data: {
      active: false
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
});
