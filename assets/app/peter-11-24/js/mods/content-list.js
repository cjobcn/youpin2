define(['vue','jquery'], function (Vue, $) {
  function translatePosted(res) {
    var data = {};
    data.items = [];

    res.position.forEach(function (one) {
      var item = {};

      //
      item.desc = {};
      item.desc.position = one['position_name'] || '';
      item.desc.company = one['client_bane'] || '';
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
        rec.active = index < 4;
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

    return { data : data };
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

  var I_CONTENTLIST_EACH = 15;

  var contentList = new Vue({
    el: '#my-position-info-list',
    data: {
      items: [],
      pages: [],
      len: 0,
      curIndex: 0,
      each: I_CONTENTLIST_EACH
    },
    compiled: function () {
      var self = this;
      $.ajax({
        type: 'post',
        url: "http://youpinsh.cn/v2/index.php?s=/Home/position/GetPositionList",
        data: this.getReadyPostData()
      })
      .done(function (res) {
        var items = translatePosted(res).data.items;
        var pages = self.getPages(items, 30);
        var len = self.getLen(pages);
        self.$set('items', pages[self.curIndex]);
        self.$set('pages', pages);
        self.$set('len', len);
        self.$emit('data-loaded');
      })
      .error(function (xhr, error) {
        console.warn('error: load data for position list failed');
      });
    },
    methods: {
      getReadyPostData: function (data) {
        return {}
      },
      showCurPage: function (index) {
        index = Math.max(0, ~~index);
        if (index < this.pages.length) {
          this.curIndex = index;
          this.$set('items', this.pages[this.curIndex]);
        }
      },
      getPages: function (items, repeat) {
        var each = this.each;
        var pages = [];
        var i = 0;

        repeat = Math.max(1, ~~repeat);
        while (repeat--) items.forEach(function (one) {
          if (i === 0)
            pages.push([]);

          pages[pages.length - 1].push($.extend(true, {}, one));
          i = ++i === each ? 0 : i;
        });

        return pages;
      },
      getLen: function (pages) {
        return pages.length >= 1
          ? (pages.length - 1) * this.each + pages[pages.length - 1].length
          : 0;
      }
    },
    components: {
      "position-item" : {
        template: '#template-position-item',
        components: {
          // "talent-recommending": {
          //   template: '#template-talent-recommending'
          // },
          "talent-matched": {
            template: '#template-talent-matched'
          }
        },
        methods: {
          onClickRecommendingBtn: function (e, item, i) {
            e.preventDefault();
            var len = item.recommending.length;
            var isrc = 4;
            if (len < isrc)
              return false;
            item.recommending.active = !item.recommending.active;
            var active = item.recommending.active;
            item.recommending.slice(isrc).forEach(function (one) {
              one.active = active;
            });
            return false;
          }
        }
      }
    },
    events: {
      'data-loaded': function () {
        pagination.$set('sum', this.pages.length);
        pagination.$set('active', true);
      }
    }
  });

  var I_PAGINATION_REMAINING = 8;

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
        this.working = false;
        return false;
      }
    }
  });

  return {
    contentList: contentList,
    pagination: pagination
  }
});