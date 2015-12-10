define([
  'vue',
  'jquery',
  './js/pagination',
  './js/translate-posted',
  './js/vue-expand'
], function (Vue, $, createPagination, translatePosted) {
  var I_HIDDEN_AT_FIRST = 6;
  var I_CONTENTLIST_EACH = 15;
  var imgDir = '../../../images/';

  var myPosition = new Vue({
    el: '#content .my-position',
    data: {
      active: true
    },
    methods: {
      show: function () {
        this.active = true;
      }
    },
    events: {
      'list-length': function (len) {
        this.$broadcast('list-length', len);
      },
      'change-list-index': function (i) {
        this.$broadcast('change-list-index', i);
      },
      'change-count-from-title': function (count) {
        this.$broadcast('change-count-from-title', count);
      }
    },
    components: {
      'my-position-title': {
        template: '#template-my-position-title',
        data: function () {
          return {
            count: false,
            active: true,
            position: "职位",
            recommandingTalent: "推荐人才",
            readyRecommandingTalent: "待推荐人才",
            update: "更新时间"
          }
        },
        methods: {
          onClick: function (e) {
            var count = this.count = !this.count;
            // -------------------------------------------
            // what is this logic ? now just set all the state be the same as the title check !
            this.$dispatch('change-count-from-title', count);
            // -------------------------------------------
            return false;
          }
        }
      },
      'my-position-content': {
        template: '#template-my-position-content',
        compiled: function () {
          // init post data would be: {} ?
          this.sendAjax({});
        },
        methods: {
          onClickRecommendingBtn: function (e, item) {
            e.preventDefault();
            var len = item.recommending.length;
            if (len <= I_HIDDEN_AT_FIRST)
              return false;
            var active = item.active = !item.active;
            item.recommending.slice(I_HIDDEN_AT_FIRST).forEach(function (one) {
              one.active = active;
            });
            return false;
          },
          getCurrentList: function () {
            return this.list;
          },
          setCurrentList: function(list) {
            this.$set('list', list);
            // fake the len
            this.setLen(this.getLen(this.getCurrentList()));
          },
          setLen: function (len) {
            this.$set('len', len);
            //this.$emit('tell-position-nav-results', len);
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
              var list = translatePosted(res).items;
              self.showDataFromBackends(list);
              if (fn)
                fn(null);
            })
            .error(function (xhr, error) {
              console.warn('error: load data for position list failed');
              if (fn)
                fn(new Error('content list: send ajax fail'))
            });
          },
          showDataFromBackends: function (list) {
            // fake many list
            list = this.getPages(list, 8);
            this.setCurrentList(list);
            // ------------------------------
            this.$emit('data-loaded');
          },
          showCurPage: function (index) {
            index = Math.max(0, ~~index);
            var list = this.getCurrentList();
            if (index < list.length) {
              // *** this.setCurrentIndex(index); ***
            }
          },
          getPages: function (list, repeat) {
            var each = this.each;
            var pages = [];
            var i = 0;
            repeat = Math.max(1, ~~repeat);
            var noRepeat = repeat === 1;
            while (repeat--) list.forEach(function (one) {
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
        events: {
          'data-loaded': function () {
            this.$dispatch('list-length', this.list.length);
          },
          'change-list-index': function (i) {
            i = ~~i;
            if (i >= 0 && i < this.list.length)
              this.currentIndex = i;
          },
          'change-count-from-title': function (count) {
            var curList = this.list[this.currentIndex];
            curList.forEach(function (one) {
              one.count = count;
            });
          }
        },
        data: function () {
          return {
            list: [],
            each: I_CONTENTLIST_EACH,
            currentIndex: 0,
            len: 0,
            ajaxPostUrl: 'http://youpinsh.cn/v2/index.php/Home/Position/GetPositionList'
          };
        }
      },
      'my-position-pagination': createPagination({
        template : '#template-pagination',
        ready: function () {
          this.show();
          this.setLen(20);
        },
        events: {
          'list-length': function (len) {
            this.setLen(len);
          },
          'change': function (i, j) {
            this.$dispatch('change-list-index', i);
          }
        }
      }),
      'my-position-aside': {
        template: '#template-my-position-aside',
        data: function () {
          return {
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
          };
        }
      }
    }
  });

  return new Vue({
    el: '#content',
    data: {
      active: false
    },
    methods: {
      show: function () {
        this.active = true;
      }
    }
  })
});
