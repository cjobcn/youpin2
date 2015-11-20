define(['vue', 'jquery'], function (Vue, $) {
  var foot = new Vue({
    el: '#foot-side-list',
    data: {
      items: [
        {
          imgSrc: 'images/side-foot-icon-1.jpg',
          href: '#',
          className: 'foot-side-locate',
          contents : ['上海市徐汇区中山西路2025号', '永升大厦1312-1314室']
        },
        {
          imgSrc: 'images/side-foot-icon-2.jpg',
          href: '#',
          className: 'foot-side-mail',
          contents : ['hr@cjobcn.com']
        },
        {
          imgSrc: 'images/side-foot-icon-3.jpg',
          href: '#',
          className: 'foot-side-tel',
          contents : ['021-34691601', '021-34691601-8016']
        },
        {
          imgSrc: 'images/side-foot-icon-4.jpg',
          href: '#',
          className: 'foot-side-global',
          contents : ['www.cjobcn.com']
        }
      ]
    },
    methods: {
      clicked : function (e, item, $index) {
        e.preventDefault();
        return false;
      }
    }
  });
  return foot;
});