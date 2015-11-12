define(['vue'], function (Vue) {
  var siteTabTitle = new Vue({
    el: '#site-tab-title',
    data: {
      tabTitles : [
        { href: '#', title : '我的职位' },
        { href: '#', title : '被委托的职位' },
        { href: '#', title : '人才库' },
        { href: '#', title : '公司管理' }
      ]
    }
  });
  return siteTabTitle;
});