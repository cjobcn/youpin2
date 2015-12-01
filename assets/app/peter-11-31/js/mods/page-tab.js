define(['vue', 'jquery', './content-list'], function (Vue, $, list) {
  var contentList = list.contentList;
  var testReadyTalentItem = list.testReadyTalentItem;

  var tabTitle = new Vue({
    el: '#site-tab-title',
    data: {
      activeIndex: 0,
      tabTitles : [
        { href: '#', name: 'my-position', title : '我的职位' },
        { href: '#', name: 'delegate-position', title : '被委托的职位' },
        { href: '#', name: 'talent-library', title : '人才库' },
        { href: '#', name: 'company-manage', title : '公司管理' }
      ]
    },
    methods: {
      onClick: function (e, item, i) {
        this.activeIndex = i;
        contentList.activeIndex = this.activeIndex;
        // --------------------------------------------------
        if (i == 0) {
          contentList.sendAjax({});
        } else if (i == 1) {
          var items = [
            $.extend(true, {}, testReadyTalentItem),
            $.extend(true, {}, testReadyTalentItem),
            $.extend(true, {}, testReadyTalentItem),
            $.extend(true, {}, testReadyTalentItem),
            $.extend(true, {}, testReadyTalentItem),
            $.extend(true, {}, testReadyTalentItem)
          ];
          contentList.showDataFromBackends(items);
        }
        return false;
      }
    }
  });
  return {
    tabTitle : tabTitle
  };
});

