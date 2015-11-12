define(['vue'], function (Vue) {
  var header = new Vue({
    el: '#header',
    data: {
      logo : {
        href : '#',
        src : 'images/site-logo.jpg',
        width : '214',
        height : '60'
      },
      imgs : [
        { isNew : true,  href: '#', className: 'img img-header-menu img-hm-person' },
        { isNew : false, href: '#', className: 'img img-header-menu img-hm-info' },
        { isNew : false, href: '#', className: 'img img-header-menu img-hm-mail' },
        { isNew : false, href: '#', className: 'img img-header-menu img-hm-switch' }
      ]
    }
  });
  return header;
});