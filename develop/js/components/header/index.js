define(['vue', 'jquery'], function (Vue, $) {
  return new Vue({
    el: 'header',
    data: {
      active: false
    },
    methods: {
      show: function () {
        // $(this.$el).removeClass('hidden');
        this.active = true;
      }
    },
    components: {
      'header-logo' : {
        template: '#template-header-logo',
        data: function () {
          return {
            href : '#'
          };
        }
      },
      'header-tab' : {
        template: '#template-header-tab',
        data: function () {
          return {
            currentIndex: 0,
            activeIndex: 0,
            tabTitles : [
              { width: "92px", left: "0px", href: "#", title: "我的职位" },
              { width: "124px", left: "126px", href: "#", title: "被委托的职位" },
              { width: "76px", left: "280px", href: "#", title: "人才库" },
              { width: "92px", left: "380px", href: "#", title: "公司管理" }
            ]
          };
        },
        methods: {
          onClick: function (e, val, i) {
            i = ~~i;
            // the range of i should not be weired !
            if (i !== this.currentIndex) {
              var prev = this.currentIndex;
              this.currentIndex = i;
              this.$emit('change', i, prev);
            }
            return false;
          }
        },
        events: {
          change: function (newIndex, prevIndex) {
            // ....
          }
        }
      },
      'header-interactive' : {
        template: '#template-header-interactive',
        data: function () {
          return {
            list: [
              {
                active: false,
                className: 'header-interactive-plus',
                iconClassName: 'fa-plus',
                list: [
                  { active: false, href: "#", value: "新建简历" },
                  { active: false, href: "#", value: "新建职位" }
                ]
              },
              {
                active: false,
                className: 'header-interactive-user',
                iconClassName: 'fa-user',
                list: [
                  { active: false, href: "#", value: "设置" },
                  { active: false, href: "#", value: "消息" },
                  { active: false, href: "#", value: "退出" }
                ]
              }
            ]
          };
        },
        methods: {
          onClick: function (e, val, i) {
            return false;
          }
        }
      }
    }
  });
});
