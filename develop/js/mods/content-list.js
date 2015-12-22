define(['../vue', 'jquery', './one-key-send', './copyright'],
  function (Vue, $, oneKeySend, copyright) {

  var I_HIDDEN_AT_FIRST = 4;
  var I_CONTENTLIST_EACH = 15;
  var I_PAGINATION_REMAINING = 8;

  function translatePosted(res) {
    var data = {};
    data.items = [];

    res.position.forEach(function (one) {
      var item = {};

      //
      item.desc = {};
      item.desc.position = one['position_name'] || '';
      item.desc.company = one['client_name'] || '';
      item.desc.name = one['manager_name'] || '';

      //
      item.recommending = [];
      // -------------------------------
      // one['recommend_resume'] 有值null的情况
      // 不按套路出牌...
      one['recommend_resume'] = one['recommend_resume'] || [];
      // -------------------------------
      one['recommend_resume'].forEach(function (v, index) {
        if (v.status == null)
          v.status = 0;
        else
          v.status = ~~v.status;
        var rec = {};
        rec.name = v['resume_name'] || '';
        rec.isNew = false;
        rec.level = v.status > 5 ? 5 : v.status < 0 ? 0 : v.status;
        // people whoes index < 4(default) should be hidden at first
        rec.active = index < I_HIDDEN_AT_FIRST;
        item.recommending.push(rec);
      });
      one['recommend_resume'].active = false;

      //
      item.matched = [];
      one['Matching_resume'].forEach(function (v) {
        if (v.status == null)
          v.status = 0;
        else
          v.status = ~~v.status;
        var matched = {};
        matched.name = v['m_resume_name'] || '';
        matched.isNew = false;
        matched.level = v.status > 5 ? 5 : v.status < 0 ? 0 : v.status;
        item.matched.push(matched);
      });

      //
      item.update = {};
      item.update.ymd = '';
      item.update.hms = '';
      var times = one['update_time'].split(' ');
      if (!times || !times.length)
        console.warn('position.update_time -> no times');
      item.update.ymd = times[0] || '';
      item.update.hms = times[1] || '';

      data.items.push(item);
    });

    return data;
  }

  Vue.transition('expand', {
    beforeEnter: function (item) {},
    enter: function (item) {},
    afterEnter: function (item) {},
    enterCancelled: function (item) {},
    beforeLeave: function (item) {},
    leave: function (item) {},
    afterLeave: function (item) {},
    leaveCancelled: function (item) {}
  });

  var __testReadyTalentItem = (function () {
    var __testReadyTalentData = {
      status: 0,
      name: 'aaa',
      isNew : false,
      level: 3,
      active: false
    };

    var __testReadyTalentItem = {
      desc : { position: '系统化策略投资经理/策略师',  company: '来自复星凯雷投资的管理团队' },
      customManager: { name: '王思聪' },
      recommending: [],
      readyRecommending: []
    };
    __testReadyTalentItem.recommending.active = false;

    var i = -1;
    var len = 8;
    while (++i < 8) {
      // people whoes index < 4(default) should be hidden at first
      __testReadyTalentData.active = i < I_HIDDEN_AT_FIRST;
      __testReadyTalentItem.recommending.push($.extend({}, __testReadyTalentData));
      __testReadyTalentItem.readyRecommending.push($.extend({}, __testReadyTalentData));
    }

    return __testReadyTalentItem;
  })();

  var contentList = new Vue({
    el: '#my-position-info-list',
    data: {
      // --------------------------
      each: I_CONTENTLIST_EACH,
      activeIndex: 0,
      contents: [
        { curIndex: 0, items: [], len: 0, ajaxPostUrl: 'http://youpinsh.cn/v2/index.php/Home/Position/GetPositionList' },
        { curIndex: 0, items: [], len: 0, ajaxPostUrl: '' },
        { curIndex: 0, items: [], len: 0, ajaxPostUrl: '' },
        { curIndex: 0, items: [], len: 0, ajaxPostUrl: '' }
      ]
    },
    compiled: function () {
      // init post data would be: {} ?
      this.sendAjax({});
    },
    methods: {
      getCurrentList: function () {
        return this.contents[this.activeIndex].items;
      },
      setCurrentList: function(items) {
        this.$set('contents[' + this.activeIndex + '].items', items);
        // fake the len
        this.setLen(this.getLen(this.getCurrentList()));
      },
      setCurrentIndex: function (index) {
        this.$set('contents[' + this.activeIndex + '].curIndex', index);
      },
      setLen: function (len) {
        this.$set('contents[' + this.activeIndex + '].len', len);
        this.$emit('tell-position-nav-results', len);
      },
      // len should be got by ajax data from backends,
      // now just fake it
      getLen: function (pages) {
        return pages.length >= 1
          ? (pages.length - 1) * this.each + pages[pages.length - 1].length
          : 0;
      },
      sendAjax: function (data, fn) {
        var self = this;
        $.ajax({
          type: 'post',
          // the url should be posted according to the activeIndex
          url: "http://youpinsh.cn/v2/index.php/Home/Position/GetPositionList",
          data: data || {}
        })
        .done(function (res) {
          var items = translatePosted(res).items;
          self.showDataFromBackends(items);
          if (fn)
            fn(null);
        })
        .error(function (xhr, error) {
          console.warn('error: load data for position list failed');
          if (fn)
            fn(new Error('content list: send ajax fail'))
        });
      },
      showDataFromBackends: function (items) {
        // fake many items
        items = this.getPages(items, 8);
        // this.activeIndex:
        // 0: is done now
        // 1: is to be tested
        // 2: is to be tested
        // 3: is to be tested
        this.setCurrentList(items);
        // ------------------------------
        this.$emit('data-loaded');
      },
      showCurPage: function (index) {
        index = Math.max(0, ~~index);
        var items = this.getCurrentList();
        if (index < items.length) {
          this.setCurrentIndex(index);
        }
      },
      getPages: function (items, repeat) {
        var each = this.each;
        var pages = [];
        var i = 0;
        repeat = Math.max(1, ~~repeat);
        var noRepeat = repeat === 1;
        while (repeat--) items.forEach(function (one) {
          if (i === 0)
            pages.push([]);

          if (noRepeat)
            pages[pages.length - 1].push(one);
          else
            pages[pages.length - 1].push($.extend(true, {}, one));

          i = ++i === each ? 0 : i;
        });

        return pages;
      }
    },
    components: {
      "my-position-content-title": {
        template: '#template-my-position-content-title',
        data: function () {
          return {
            title: {
              position: '职位',
                recommending: '推荐中人才',
                matched: '匹配人才',
                update: '更新时间'
            }
          };
        }
      },
      "my-position-items" : {
        template: '#template-my-position-items',
        data: function () {
          return {
            itemLimit: I_HIDDEN_AT_FIRST
          }
        },
        components: {
          "talent-matched": {
            template: '#template-talent-matched'
          }
        },
        methods: {
          onClickRecommendingBtn: function (e, item, i) {
            e.preventDefault();
            var len = item.recommending.length;
            if (len <= this.itemLimit)
              return false;

            var active = item.recommending.active = !item.recommending.active;
            // --------------------------------------------------------------
            var $btn = $(item.$el).find('.talent-btn');
            if (active)
              $btn.removeClass('fa-chevron-down').addClass('fa-chevron-up');
            else
              $btn.removeClass('fa-chevron-up').addClass('fa-chevron-down');
            // --------------------------------------------------------------
            item.recommending.slice(this.itemLimit).forEach(function (one) {
              one.active = active;
            });
            return false;
          }
        }
      },
      "delegated-title": {
        template: '#template-delegated-title',
        data: function () {
          return {
            title: {
              position: '职位',
              customManager: '客户经理',
              recommending: '推荐中人才',
              readyRecommending: '待推荐人才'
            }
          };
        }
      },
      "delegated-position-items" : {
        data: function () {
          return {
            itemLimit: I_HIDDEN_AT_FIRST
          }
        },
        template: '#template-delegated-position-items',
        components: {
          "talent-matched": {
            template: '#template-talent-matched'
          }
        },
        methods: {
          onClickRecommendingBtn: function (e, item, i) {
            e.preventDefault();
            var len = item.recommending.length;
            if (len <= this.itemLimit)
              return false;

            var active = item.recommending.active = !item.recommending.active;
            item.recommending.slice(this.itemLimit).forEach(function (one) {
              one.active = active;
            });
            return false;
          }
        }
      }
    },
    events: {
      'data-loaded': function () {
        pagination.$set('sum', this.getCurrentList().length);

        if (!pagination.active)
          pagination.$set('active', true);

        if (!oneKeySend.active)
          oneKeySend.show();

        if (!copyright.active)
          copyright.show();
      }
    }
  });

  var pagination = new Vue({
    el: '#pagination',
    data: {
      active: false,
      sum: 0,
      start: 0,
      cur: 0,
      remaining: I_PAGINATION_REMAINING,
      working: false
    },
    methods : {
      onClick : function (e, i, isTarget) {
        e.preventDefault();
        i = isTarget ? Math.min(Math.max(0, ~~i), this.sum - 1) : i;
        // there may be many pages, but can't store them if a too large number from mySQL,
        // so if hitting the limit of the current range which is less than the sum from backends,
        // then this click action should trigger an ajax action
        if (i < 0 || i == this.cur || i > this.sum - 1 || this.working)
          return false;
        this.working = true;

        if (i === this.sum - 1) {
          this.start = this.sum - 1 - this.remaining;
        } else if (i === 0) {
          this.start = 0;
        } else {
          this.start = i > this.start + this.remaining
            ? this.start + 1
            : i < this.start
            ? this.start - 1
            : this.start;
        }

        this.cur = i;
        contentList.showCurPage(this.cur);
        pagination.$nextTick(function () {
          pagination.working = false;
        });
        return false;
      }
    }
  });

  return {
    contentList: contentList,
    pagination: pagination,
    testReadyTalentItem: __testReadyTalentItem
  };
});




