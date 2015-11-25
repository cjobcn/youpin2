define(['vue', 'jquery'], function (Vue, $) {
  return new Vue({
    el: '#publish-delegate',
    data: {},
    methods: {
      publish: function (e) {
        e.preventDefault();
        console.log('publish');
        return false;
      },
      delegate: function (e) {
        e.preventDefault();
        console.log('delegate');
        return false;
      }
    }
  })
});