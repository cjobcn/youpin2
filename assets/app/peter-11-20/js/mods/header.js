define(['vue', 'jquery'], function (Vue, $) {
  var header = new Vue({
    el: '#header',
    data: {
      logo : {
        href : '#',
        // src : './images/site-logo.jpg',
        // width : '214',
        // height : '60'
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