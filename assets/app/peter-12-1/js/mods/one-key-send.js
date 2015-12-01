define(['vue', 'jquery'], function (Vue, $) {
  return new Vue({
    el: '#one-key-send',
    data: {
      active: false
    },
    methods: {
      onClick: function (e) {
        console.log('一键转发!');
      },
      show: function () {
        $(this.$el).removeClass('hidden');
        this.active = true;
      }
    }
  });
});
