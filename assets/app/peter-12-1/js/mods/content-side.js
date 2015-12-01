define(['vue', 'jquery'], function (Vue, $) {
  var contentSide = new Vue({
    el: '#content-side-imgs',
    data: {
      img1 : { imgSrc: "images/side-img-1.jpeg", href: '#' },
      items: [
        {
          title: '联合货币',
          content: 'SegmentFault是一个面向中文开发者的专业技术社区及服务平台',
          imgSrc: "images/side-item.jpg",
          href: '#'
        },
        {
          title: '联合货币',
          content: 'SegmentFault是一个面向中文开发者的专业技术社区及服务平台',
          imgSrc: "images/side-item.jpg",
          href: '#'
        },
        {
          title: '联合货币',
          content: 'SegmentFault是一个面向中文开发者的专业技术社区及服务平台',
          imgSrc: "images/side-item.jpg",
          href: '#'
        }
      ]
    },
    methods: {}
  });
  return contentSide;
});