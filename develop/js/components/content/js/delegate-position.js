define([
  'vue',
  'jquery',
  '../pagination/index',
  './test-ready-talent-item',
  './vue-expand'
], function (Vue, $, createPagination, testReadyTalentItem) {
  var I_HIDDEN_AT_FIRST = 4;
  var I_CONTENTLIST_EACH = 15;

  var pagination = createPagination('#delegate-position .pagination');

  var contentList = new Vue({
    el: '#delegate-position .info-list',
    data: {
      // --------------------------
      each: I_CONTENTLIST_EACH,
      curIndex: 0,
      items: [],
      len: 0,
      ajaxPostUrl: 'http://youpinsh.cn/v2/index.php/Home/Position/GetPositionList'
    },
    compiled: function () {
      // init post data would be: {} ?
      this.sendAjax({});
    },
    methods: {
      getCurrentList: function () {
        return this.items;
      },
      setCurrentList: function(items) {
        this.$set('items', items);
        // fake the len
        this.setLen(this.getLen(this.getCurrentList()));
      },
      setLen: function (len) {
        this.$set('len', len);
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

        //console.log(testReadyTalentItem);

        var items = [
          $.extend(true, {}, testReadyTalentItem),
          $.extend(true, {}, testReadyTalentItem),
          $.extend(true, {}, testReadyTalentItem),
          $.extend(true, {}, testReadyTalentItem),
          $.extend(true, {}, testReadyTalentItem),
          $.extend(true, {}, testReadyTalentItem)
        ];
        self.showDataFromBackends(items);

        //$.ajax({
        //  type: 'post',
        //  // the url should be posted according to the activeIndex
        //  url: "http://youpinsh.cn/v2/index.php/Home/Position/GetPositionList",
        //  data: data || {}
        //})
        //  .done(function (res) {
        //    var items = translatePosted(res).items;
        //    self.showDataFromBackends(items);
        //    if (fn)
        //      fn(null);
        //  })
        //  .error(function (xhr, error) {
        //    console.warn('error: load data for position list failed');
        //    if (fn)
        //      fn(new Error('content list: send ajax fail'))
        //  });
      },
      showDataFromBackends: function (items) {
        // fake many items
        items = this.getPages(items, 8);
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
        pagination.setLen(this.getCurrentList().length);

        if (!pagination.active)
          pagination.show();
      }
    }
  });

  var imgDir = '../../../images/';

  var positionSide = new Vue({
    el: '#delegate-position .row-side',
    data: {
      img1 : { imgSrc: imgDir + "side-img-1.jpeg", href: '#' },
      items: [
        {
          title: '联合货币',
          content: 'SegmentFault是一个面向中文开发者的专业技术社区及服务平台',
          imgSrc: imgDir + "side-item.jpg",
          href: '#'
        },
        {
          title: '联合货币',
          content: 'SegmentFault是一个面向中文开发者的专业技术社区及服务平台',
          imgSrc: imgDir + "side-item.jpg",
          href: '#'
        },
        {
          title: '联合货币',
          content: 'SegmentFault是一个面向中文开发者的专业技术社区及服务平台',
          imgSrc: imgDir + "side-item.jpg",
          href: '#'
        }
      ]
    },
    methods: {}
  });

  return {
    list: contentList,
    pagination: pagination,
    side: positionSide
  };
});
