define(['../vue', 'jquery'], function (Vue, $) {
  return new Vue({
    el: '#copyright',
    data: {
      active: false
    },
    methods: {
      show: function () {
        $(this.$el).removeClass('hidden');
        this.active = true;
      }
    }
  });
});
