define(['vue', 'jquery'], function (Vue, $) {
  var tabTitle = new Vue({
    el: '#site-tab-title',
    data: {
      activeIndex: 0,
      tabTitles : [
        { href: '#', title : '我的职位' },
        { href: '#', title : '被委托的职位' },
        { href: '#', title : '人才库' },
        { href: '#', title : '公司管理' }
      ]
    },
    methods: {}
  });
  return {
    tabTitle : tabTitle
  };
});

