define([
  'vue',
  'jquery'
], function (Vue, $) {
  return new Vue({
    el: 'nav',
    methods: {
      show: function () {
        this.active = true;
      },
      onKeyUp : function (e, text) {
        this.$emit('main-search', text);
        this.mainSearch.text = "";
        return false;
      },
      onNavListLi1Click: function (e, val, i) {
        if (i === this.activeListIndex) {
          return false;
        }
        this.list[this.activeListIndex].active = false;
        val.active = true;
        this.activeListIndex = i;
        return false;
      }
    },
    events: {
      'main-search': function (text) {
        // ....
      }
    },
    data: {
      active: false,
      activeListIndex: 0,
      mainSearch: {
        text: "",
        placeholder: '搜索'
      },
      list: [
        {
          iconClassName: 'icon-nav-position-state',
          text: '职位状态',
          desc: 'position-state',
          active: true
        },
        {
          iconClassName: 'icon-nav-industry-function',
          text: '行业职能',
          desc: 'industry-function',
          active: false
        },
        {
          iconClassName: 'icon-nav-custom',
          text: '客户',
          desc: 'custom',
          active: false
        },
        {
          iconClassName: 'icon-nav-custom-manager',
          text: '客户经理',
          desc: 'custom-manager',
          active: false
        },
        {
          iconClassName: 'icon-nav-work-place',
          text: '工作地点',
          desc: 'work-place',
          active: false
        },
        {
          iconClassName: 'icon-nav-salary',
          text: '薪酬',
          desc: 'salary',
          active: false
        }
      ]
    },
    components: {
      'position-state' : {
        template : '#template-position-state',
        data: function () {
          return {
            currentListIndex: 0,
            list: [
              { href:"#", text: "发布中职位", state: 1 },
              { href:"#", text: "已关闭职位", state: 2 },
              { href:"#", text: "已暂缓职位", state: 3 },
              { href:"#", text: "已成功职位", state: 4 }
            ]
          };
        },
        methods: {
          onClick: function (e, val, i) {
            this.currentListIndex = i;
            return false;
          },
          getState: function () {
            return this.list[this.currentListIndex].state;
          }
        }
      }
    }
  });
});
