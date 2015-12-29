requirejs.config({
  baseUrl: './',
  paths: {
    jquery: '../js/libs/jquery',
    vue: '../js/libs/vue'
  }
});
require([
  '../js/header',
  '../js/copyright',
  'jquery',
  'vue',
  '../js/libs/pagination'
], function (mod, mod2, $, Vue, createPagination) {
  mod.show();
  mod2.show();

  var stop = function(e) {
    if (e == null) return;
    if (e.preventDefault) e.preventDefault();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
  };

  var activeIndex = 0;

  new Vue({
    el: '.talent-libs',
    data: {
      activeIndex: activeIndex
    },
    methods: {},
    events: {
      'change-tab-index': function (i) {
        this.activeIndex = i;
        this.$broadcast('change-tab-index', i);
      },
      'change-list-index-0': function (i) {
        this.$broadcast('change-list-index-0', i);
      },
      'change-list-index-1': function (i) {
        this.$broadcast('change-list-index-1', i);
      }
    },
    components: {
      'talent-libs-tab-title': {
        template: '#template-talent-libs-tab-title',
        data: function () {
          return {
            activeIndex: activeIndex,
            list: [
              { value: '人才商场' },
              { value: '我的人才' }
            ],
            search: {
              active: false,
              placeholder: "候选人姓名/职位",
              value: ''
            },
            joinSell: {
              active: false,
              text: '加入拍卖'
            }
          };
        },
        methods: {
          onClick: function (e, i) {
            this.activeIndex = i;
            this.$dispatch('change-tab-index', i);
            this.search.active = i == 1;
            // ***************************
            this.joinSell.active = i == 1;
            // ***************************
            return false;
          }
        }
      },
      // *********************************************************
      'talent-libs-title-0': {
        template: '#template-talent-libs-title-0',
        data: function () {
          return {
            candidate: '候选人',
            recentPosition: '更新时间',
            intentCity: '上传顾问',
            headhunterCompany: '猎头公司 ',
            uploadConsult: '意向城市',
            refreshTime: '最近职位'
          };
        }
      },
      'talent-libs-tab-content-item-0': {
        template: '#template-talent-libs-tab-content-item-0',
        data: function () {
          var tabItem0Item = {
            candidate: {
              name: '杨劲波',
              sexAge: '男/26岁'
            },
            recentPosition: {
              position: '研发工程师',
              company: '华为'
            },
            intentCity: '上海',
            headhunterCompany: '协骏',
            uploadConsult: '孙还还',
            refreshTime: {
              ymd: '2015/12/10',
              hms: '16:00'
            },
            recommend: '推荐到职位'
          };

          var tabItem0List = [];
          var i = 11;
          while (i--) {
            tabItem0List.push($.extend(true, {}, tabItem0Item ));
          }

          var k = 20;
          var list = [];
          while (k--) {
            list.push($.extend(true, [], tabItem0List));
          }

          return {
            activeIndex: 0,
            iMaxEachPage: 11,
            list: list
          };
        },
        events: {
          'change-list-index-0': function (i) {
            this.activeIndex = i;
          }
        }
      },
      'talent-libs-pagination-0': createPagination({
        template: '#template-talent-libs-pagination-0',
        ready: function () {
          this.setLen(20);
        },
        events: {
          'list-length': function (len) {
            this.setLen(len);
          },
          'change': function (i) {
            this.$dispatch('change-list-index-0', i);
          }
        }
      }),
      // *********************************************************
      'talent-libs-title-1': {
        template: '#template-talent-libs-title-1',
        data: function () {
          return {
            candidate: '候选人',
            recentPosition: '更新时间',
            intentCity: '上传顾问',
            headhunterCompany: '猎头公司 ',
            uploadConsult: '意向城市',
            refreshTime: '最近职位'
          };
        }
      },
      'talent-libs-tab-content-item-1': {
        template: '#template-talent-libs-tab-content-item-1',
        data: function () {
          var tabItem0Item = {
            candidate: {
              name: '杨劲波',
              sexAge: '男/26岁'
            },
            recentPosition: {
              position: '研发工程师',
              company: '华为'
            },
            intentCity: '上海',
            headhunterCompany: '协骏',
            uploadConsult: '孙还还',
            refreshTime: {
              ymd: '2015/12/10',
              hms: '16:00'
            },
            notes: [
              { href: "#", desc: "record", className: "img-item-record" },
              { href: "#", desc: "note", className: "img-item-note" },
              { href: "#", desc: "heart", className: "img-item-heart" },
              { href: "#", desc: "trash", className: "img-item-trash" }
            ]
          };
          var tabItem0List = [];
          var i = 11;
          while (i--) {
            tabItem0List.push($.extend(true, {}, tabItem0Item ));
          }

          var k = 20;
          var list = [];
          while (k--) {
            list.push($.extend(true, [], tabItem0List));
          }

          return {
            activeIndex: 0,
            iMaxEachPage: 11,
            list: list
          };
        },
        methods: {
          onClickEdit: function (e, val, item) {
            stop(e);

            switch (val.desc) {
              case 'record':
                //this.$dispatch('edit-record', item);
                alert(0);
                break;
              case 'note':
                //this.$dispatch('edit-note', item);
                alert(1);
                break;
              case 'heart':
                //this.$dispatch('edit-heart', item);
                alert(2);
                break;
              case 'trash':
                //this.$dispatch('edit-trash', item);
                alert(3);
                break;
            }
          }
        },
        events: {
          'change-list-index-1': function (i) {
            this.activeIndex = i;
          }
        }
      },
      'talent-libs-pagination-1': createPagination({
        template: '#template-talent-libs-pagination-1',
        ready: function () {
          this.setLen(20);
        },
        events: {
          'list-length': function (len) {
            this.setLen(len);
          },
          'change': function (i) {
            this.$dispatch('change-list-index-1', i);
          }
        }
      }),
      // *********************************************************
      'talent-libs-aside': {
        template: '#template-talent-libs-aside',
        data: function () {
          return {
            image: {
              href: '#',
              src: "../images/side-img-1.jpeg",
              width: "210px",
              height: "195px"
            },
            cv: {
              advice: '恒大地产的销售总监与您发布的中信地产营销总监职位很相似试试把您已有的简历投递过去？',
              view: {
                href: '#',
                text: '浏览该职位'
              },
              more: {
                href: '#',
                text: '查看更多'
              }
            }
          }
        }
      }
    }
  });

}, function (err) {
  throw err;
});
