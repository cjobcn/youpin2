define(['vue', 'jquery'], function (Vue, $) {
  var header = new Vue({
    el: '#header',
    data: {
      logo : {
        href : '#'
      },
      imgs : [
        { isNew : true,  href: '#', className: 'img-hm-person' },
        { isNew : false, href: '#', className: 'img-hm-info' },
        { isNew : false, href: '#', className: 'img-hm-mail' },
        { isNew : false, href: '#', className: 'img-hm-switch' }
      ]
    }
  });
  return header;
});