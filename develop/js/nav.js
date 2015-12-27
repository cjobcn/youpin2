define([
  'vue',
  'jquery',
  './nav/assemble-nav-data',
  './nav/walker',
  '../js/libs/db',
  './header',
  './nav/ajax-keys'
], function (Vue, $, navData, walker, db, header, ajaxKeys) {
  // *****************************************
  // TO DO: header must set the right activeIndex, then nav can get the right storage data
  // console.log(db.data('navSelections'));
  // *****************************************

  var navSelections = db.navSelections;

  var componentEvents = {
    close: function (desc) {
      if (this.desc === desc && this.active) {
        this.active = false;
      }
    },
    open: function (desc) {
      if (this.desc === desc && !this.active) {
        this.active = true;
      }
    },
    // **********************************************************
    // TO DO: In the first, split the navSelections to "{single arr}s" for each section
    // **********************************************************
    'init-selections': function (key, arr) {
      if (this.initSelections)
        this.initSelections(key, arr);
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
    },

    initSelections: function (key, arr) {
      var self = this;

      if (
        self.hasInitedSelections ||
        self.list == null ||
        self.ajaxKey == null ||
        self.ajaxKey != key
      ) { return; }

      self.hasInitedSelections = true;

      // remember the key of each section, to decide how to find the val
      // var key = self.ajaxKey;
      // pass all the results to nav-result section
      var results = [];
      // the val to be added
      var val;

      arr.forEach(function (ajax) {
        if (ajax.key !== key)
          throw new Error('key is not the same ' + key);

        switch (ajax.key) {
          case ajaxKeys.status:
          case ajaxKeys.client:
          case ajaxKeys.manager:
          case ajaxKeys.city:
            self.list.forEach(function (_val) {
              if (_val.ajax.value == ajax.value) {
                val = _val;
                return false;
              }
            });
            break;

          case ajaxKeys.industry:
            self.list.forEach(function (one) {
              walker(one, function (_val) {
                if (_val.ajax.value == ajax.value) {
                  val = _val;
                  return false;
                }
              });
            });
            break;

          //salary is not to be considered right now
          //case ajaxKeys.salary
        }

        // if no val to be found, there must be an error
        if (val == null)
          throw new Error(ajax.key + ': no val: ' + ajax);

        val.active = true;
        results.push(val);
        val = null;
      });

      self.$dispatch('init-results', results);
    }
  };

  var listenClick = false;

  return new Vue({
    el: 'nav',
    ready: function () {},
    methods: {
      hide: function () {
        this.active = false;
      },
      show: function () {
        this.active = true;
        this.listenClick();
        this.initSelections();
      },
      initSelections: function () {
        if (!header || header.activeIndex == null) return;
        if (this.hasInitedSelections) return;
        this.hasInitedSelections = true;

        var data = {};
        ('status city client manager industry').split(' ').forEach(function (key) {
          data[ajaxKeys[key]] = [];
        });

        var arr = navSelections.get(header.activeIndex);
        if ($.isArray(arr)) arr.forEach(function (one) {
          data[one.key].push(one);
        });

        for (var key in data) {
          if (data.hasOwnProperty(key) && data[key].length)
            this.$broadcast('init-selections', key, data[key]);
        }

        // sort and sync the data
        arr.sort(function (a, b) {
          return a.key - b.key;
        });
        navSelections.set(header.activeIndex, arr);

        this.$broadcast('sort-init-results');
      },
      onKeyUp : function (e, text) {
        this.$emit('main-search', text);
        this.mainSearch.text = "";
        return false;
      },
      getActive: function () {
        return this.list[this.activeListIndex];
      },
      openClose: function (e, val, i, toOpen) {
        stop(e);

        if (i < 0)
          return;

        var $active = this.getActive();
        if ($active) {
          $active.active = false;
          this.$broadcast('close', $active.desc);
          if (i === this.activeListIndex) {
            this.activeListIndex = -1;
          }
        }

        if (toOpen) {
          val.active = true;
          this.$broadcast('open', val.desc);
          this.activeListIndex = i;
        }
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
      // only for nav-results
      'add-result': function (val) {
        this.$broadcast('add-result', val);
      },
      // only for nav-results
      'remove-result': function (val) {
        this.$broadcast('remove-result', val);
      },
      // only for nav-results
      'init-results': function (arr) {
        this.$broadcast('init-results', arr);
      }
    },
    data: {
      hasInitedSelections: false,
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
            hasInitedSelections : false,
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
              navSelections.empty(header.activeIndex);
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
                navSelections.add(header.activeIndex, { key: val.ajax.key, value: val.ajax.value });
              }
            }
            // ----------------------------------
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
                navSelections.remove(header.activeIndex, i);
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
          },
          'init-results': function (arr) {
            var i = -1;
            var len = arr.length;
            while (++i < len) {
              if (arr[i].active)
                this.list.push(arr[i]);
            }
          },
          'sort-init-results': function () {
            this.list.sort(function (a, b) {
              return a.key - b.key;
            });
          }
        }
      },
      'salary': {
        template: '#template-salary',
        data : function () {
          return {
            ajaxKey: ajaxKeys.salary,
            hasInitedSelections : false,
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
        events: $.extend({}, componentEvents)
      },
      // -------- work-place: city ----------
      'city': {
        template: '#template-city',
        data : function () {
          return {
            ajaxKey: ajaxKeys.city,
            hasInitedSelections : false,
            active: false,
            desc: 'city',
            list: navData.city
          };
        },
        methods: $.extend({}, commonMethods),
        events: $.extend({}, componentEvents)
      },
      'custom-manager': {
        template: '#template-custom-manager',
        data : function () {
          return {
            ajaxKey: ajaxKeys.manager,
            hasInitedSelections : false,
            active: false,
            desc: 'custom-manager',
            list: navData.customManager
          };
        },
        methods: $.extend({}, commonMethods),
        events: $.extend({}, componentEvents)
      },
      'custom': {
        template: '#template-custom',
        data : function () {
          return {
            ajaxKey: ajaxKeys.client,
            hasInitedSelections : false,
            active: false,
            desc: 'custom',
            list: navData.custom
          };
        },
        methods: $.extend({}, commonMethods),
        events: $.extend({}, componentEvents)
      },
      'industry-function': {
        template: '#template-industry-function',
        data : function () {
          return {
            ajaxKey: ajaxKeys.industry,
            hasInitedSelections : false,
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
        events: $.extend({}, componentEvents)
      },
      'position-state' : {
        template : '#template-position-state',
        data: function () {
          return {
            ajaxKey: ajaxKeys.status,
            hasInitedSelections : false,
            active: false,
            desc: 'position-state',
            // *************************************************************************************************
            list: [
              { active: false, href:"#", name: "发布中职位", state: 1, ajax: { key: ajaxKeys.status, value: 1 } },
              { active: false, href:"#", name: "已关闭职位", state: 2, ajax: { key: ajaxKeys.status, value: 2 } },
              { active: false, href:"#", name: "已暂缓职位", state: 3, ajax: { key: ajaxKeys.status, value: 3 } },
              { active: false, href:"#", name: "已成功职位", state: 4, ajax: { key: ajaxKeys.status, value: 4 } }
            ]
            // *************************************************************************************************
          };
        },
        methods: $.extend({}, commonMethods),
        events: $.extend({}, componentEvents)
      }
    }
  });
});
