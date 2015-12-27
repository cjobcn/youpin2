define([
  'vue',
  'jquery'
], function (Vue, $) {
  return new Vue({
    el: '.position-edit',
    data: {
      active: false
    },
    methods: {
      show: function () {
        this.active = true;
        $(this.$el).removeClass('hidden');
      },
      hide: function () {
        this.active = false;
        $(this.$el).addClass('hidden');
      },
      clickBtn: function (e) {
        this.$emit('clickBtn');
        return false;
      }
    },
    events: {
      clickBtn: function () {}
    }
  });
});
