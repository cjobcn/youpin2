define([
  'vue',
  'jquery',
  './js/assemble-nav-data',
  './js/walker'
], function (Vue, $, navData, walker) {

  var openClose = {
    close: function (desc) {
      if (this.desc === desc && this.active) {
        this.active = false;
      }
    },
    open: function (desc) {
      if (this.desc === desc && !this.active) {
        this.active = true;
      }
    }
  };

  var posting = false;

  var stop = function (e) {
    e.stopImmediatePropagation();
    e.preventDefault();
  };

  var commonMethods = {
    stop: stop,
    onClick: function (e, val, i) {
      stop(e);

      var active = !val.active;

      var eventName = active
        ? 'add-result'
        : 'remove-result';

      // ... add or remove
      this.$dispatch(eventName, val);

      return false;
    }
  };

  var listenClick = false;

  return new Vue({
    el: 'nav',
    ready: function () {},
    methods: {
      show: function () {
        this.active = true;
        this.listenClick();
      },
      onKeyUp : function (e, text) {
        this.$emit('main-search', text);
        this.mainSearch.text = "";
        return false;
      },
      getActive: function () {
        return this.list[this.activeListIndex];
      },
      onNavListLi1Click: function (e, val, i) {
        stop(e);

        if (i < 0)
          return;

        var $active = this.getActive();
        if ($active) {
          $active.active = false;
          this.$broadcast('close', $active.desc);
          if (i === this.activeListIndex) {
            this.activeListIndex = -1;
            return;
          }
        }
        val.active = true;
        this.$broadcast('open', val.desc);
        this.activeListIndex = i;
      },
      listenClick: function (e) {
        if (listenClick) {
          return;
        }
        listenClick = true;
        var el = this.$el;
        var self = this;
        $('body').click(function (e) {
          if (!$.contains(el, e.target)) {
            var $active = self.getActive();
            if ($active) {
              $active.active = false;
              self.$broadcast('close', $active.desc);
            }
            self.activeListIndex = -1;
          }
        });
      }
    },
    events: {
      'main-search': function (text) {},
      'add-result': function (val) {
        this.$broadcast('add-result', val);
      },
      'remove-result': function (val) {
        this.$broadcast('remove-result', val);
      }
    },
    data: {
      active: false,
      activeListIndex: -1,
      mainSearch: {
        text: "",
        placeholder: '搜索'
      },
      list: [
        {
          iconClassName: 'icon-nav-position-state',
          text: '职位状态',
          desc: 'position-state',
          active: false
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
          desc: 'city',
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
      'nav-result': {
        template: '#template-nav-result',
        data: function () {
          return {
            list: []
          }
        },
        methods: {
          onClickDelete: function (e, val) {
            stop(e);
            this.remove(val);
          },
          empty: function (e) {
            stop(e);
            if (this.list.length) {
              this.list.forEach(function (val) {
                val.active = false;
              });
              this.list = [];
            }
          },
          add: function (val) {
            if (val == null)
              return;

            if (!val.active) {
              val.active = true;
            }

            if (val.name) {
              var i = this.list.indexOf(val);
              if (i === -1) {
                this.list.push(val);
              }
            }
          },
          remove: function (val) {
            if (val == null)
              return;

            if (val.active) {
              val.active = false;
            }

            if (val.name) {
              var i = this.list.indexOf(val);
              if (i > -1) {
                this.list.splice(i, 1);
              }
            }
          }
        },
        events: {
          'add-result': function (val) {
            this.add(val);
          },
          'remove-result': function (val) {
            this.remove(val);
          }
        }
      },
      'salary': {
        template: '#template-salary',
        data : function () {
          return {
            active: false,
            desc: 'salary',
            min: "",
            max: "",
            minimum: 1,
            maximum: 10000
          };
        },
        methods: {
          onClick: function (e) {
            stop(e);
            console.log('salary click');
          },
          stop: stop
        },
        events: $.extend({}, openClose)
      },
      // -------- work-place: city ----------
      'city': {
        template: '#template-city',
        data : function () {
          return {
            active: false,
            desc: 'city',
            list: navData.city
          };
        },
        methods: $.extend({}, commonMethods),
        events: $.extend({}, openClose)
      },
      'custom-manager': {
        template: '#template-custom-manager',
        data : function () {
          return {
            active: false,
            desc: 'custom-manager',
            list: navData.customManager
          };
        },
        methods: $.extend({}, commonMethods),
        events: $.extend({}, openClose)
      },
      'custom': {
        template: '#template-custom',
        data : function () {
          return {
            active: false,
            desc: 'custom',
            list: navData.custom
          };
        },
        methods: $.extend({}, commonMethods),
        events: $.extend({}, openClose)
      },
      'industry-function': {
        template: '#template-industry-function',
        data : function () {
          return {
            anchorHeight: 26,
            active: false,
            desc: 'industry-function',
            list: navData.industry
          };
        },
        methods: $.extend({}, commonMethods, {
          countAnchorHeight: function (item) {
            var i = 0;
            walker(item, function (item) {
              if (item.level === 2)
                i++;
            });
            return ~~(i / 2) * this.anchorHeight
              + (i % 2) * this.anchorHeight
              + this.anchorHeight * 4
              + 'px';
          }
        }),
        events: $.extend({}, openClose)
      },
      'position-state' : {
        template : '#template-position-state',
        data: function () {
          return {
            active: false,
            desc: 'position-state',
            list: [
              { active: false, href:"#", name: "发布中职位", state: 1, ajax: {} },
              { active: false, href:"#", name: "已关闭职位", state: 2, ajax: {} },
              { active: false, href:"#", name: "已暂缓职位", state: 3, ajax: {} },
              { active: false, href:"#", name: "已成功职位", state: 4, ajax: {} }
            ]
          };
        },
        methods: $.extend({}, commonMethods),
        events: $.extend({}, openClose)
      }
    }
  });
});
