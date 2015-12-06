define(['vue', 'jquery'], function (Vue, $) {
  return new Vue({
    el: '#header',
    data: {
      active: false,
      logo : {
        href : '#'
      },
      imgs : [
        { isNew : true,  href: '#', className: 'img-hm-person' },
        { isNew : false, href: '#', className: 'img-hm-info' },
        { isNew : false, href: '#', className: 'img-hm-mail' },
        { isNew : false, href: '#', className: 'img-hm-switch' }
      ]
    },
    methods: {
      show: function () {
        $(this.$el).removeClass('hidden');
        this.active = true;
      }
    }
  });
});
