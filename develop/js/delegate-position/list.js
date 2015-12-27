define([
  'vue',
  'jquery',
  '../libs/pagination',
  './translate-posted',
  '../libs/vue-expand'
], function (Vue, $, createPagination, translatePosted) {
  var I_HIDDEN_AT_FIRST = 4;
  var I_CONTENTLIST_EACH = 15;
  var imgDir = '../images/';
  var ajaxPostUrl = 'http://youpinsh.cn/v2/index.php/Home/Position/GetPositionList';

  var stop = function (e) {
    e.stopImmediatePropagation();
    e.preventDefault();
  };

  return new Vue({
    el: '.delegate-position',
    data: {
      active: false
    },
    methods: {
      show: function () {
        this.active = true;
      },
      hide: function () {
        this.active = false;
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
      },
      'edit-record': function (item) {},
      // edit-note is alias for position-detail
      // this event needs item's cv data from backends,
      // now just fake the data
      // the data api should be part of content list item
      'edit-note': function (item) {
        // the content and the nav should be covered under this note page
        // so the position of this note page would be a seperate part of the whole app
        //content.$emit('edit-note', item);
      },
      'edit-heart': function (item) {},
      'edit-trash': function (item) {}
    },
    components: {
      'delegate-position-title': {
        template: '#template-delegate-position-title',
        data: function () {
          return {
            count: false,
            active: true,
            position: "职位",
            customManager: "客户经理",
            recommandingTalent: "推荐人才",
            readyRecommandingTalent: "待推荐人才",
            update: "更新时间"
          }
        },
        methods: {
          onClick: function (e) {
            var count = this.count = !this.count;
            // -------------------------------------------
            // what is this logic ?
            // now just set all the state be the same as the title check !
            this.$dispatch('change-count-from-title', count);
            // -------------------------------------------
            return false;
          }
        }
      },
      'delegate-position-content': {
        template: '#template-delegate-position-content',
        compiled: function () {
          // init post data would be: {} ?
          this.sendAjax({});
        },
        ready: function () {
          this.doc = $(document);
        },
        data: function () {
          return {
            editing: false,
            list: [],
            each: I_CONTENTLIST_EACH,
            currentIndex: 0,
            len: 0,
            ajaxPostUrl: ajaxPostUrl,
            doc: null,
            drag: {
              mousemove: null,
              mouseup: null,
              scrollbar: null,
              content: null,
              isDraging: false
            }
          };
        },
        methods: {
          enterCol2: function (e, item) {
            stop(e);
            item.desc.active = true;
            this.clearDrag();
          },
          leaveCol2: function (e, item) {
            stop(e);
            item.desc.active = false;
            this.clearDrag();
          },
          scrollbarMouseDown: function (e) {
            stop(e);
            if (this.drag.isDraging)
              throw new Error('not draging, but receive: scrollbarMouseDown');

            this.drag.isDraging = true;
            var $scrollbar = $(e.target);
            var $content = $scrollbar.parent().siblings('.delegate-position-desc-pd-c').find('div');
            this.drag.scrollbar = $scrollbar;
            this.drag.content = $content;

            var irange = $scrollbar.parent().height() - $scrollbar.height();
            var minY = $scrollbar.parent().offset().top - $(window).scrollTop();
            var maxY = minY + irange;
            var self = this;

            var mousemove = function (e) {
              stop(e);
              if (!self.drag.isDraging)
                throw new Error('not draging, but receive: mousemove');

              var curY = e.clientY;
              var deltaY = curY <= minY
                ? 0
                : curY >= maxY
                ? irange
                : curY - minY;
              self.drag.scrollbar.css('top', deltaY);
              // this step would need some counts,
              // to get the right scale of the top position;
              // but if set the accurate height of the "container",
              // it's no need to do that extra step.
              self.drag.content.css('top', -deltaY);

              return false;
            };

            var mouseup = function (e) {
              stop(e);
              if (!self.drag.isDraging)
                throw new Error('not draging, but receive: mouseup');

              self.clearDrag();
              mousemove = null;
              mouseup = null;
              $scrollbar = null;
              $content = null;

              return false;
            };

            this.doc.mousemove(mousemove);
            this.doc.mouseup(mouseup);

            return false;
          },
          clearDrag: function (e) {
            if (e)
              stop(e);

            if (!this.drag.isDraging)
              return;

            this.drag.isDraging = false;
            // does it need to trigger mouseup to prevent memory leak ?
            this.doc.off('mousemove');
            this.doc.off('mouseup');
            this.drag.scrollbar = null;
            this.drag.content = null;
          },
          enterDesc: function (e, desc, item) {
            stop(e);
            desc.active = true;
            //console.log('enter');
          },
          leaveDesc: function (e, desc, item) {
            stop(e);
            desc.active = false;
            //console.log('leave');
          },
          onClickEdit: function (e, val, item) {
            stop(e);

            //if (this.editing)
            //  return;
            //this.editing = true;

            switch (val.desc) {
              case 'record':
                this.$dispatch('edit-record', item);
                break;
              case 'note':
                this.$dispatch('edit-note', item);
                break;
              case 'heart':
                this.$dispatch('edit-heart', item);
                break;
              case 'trash':
                this.$dispatch('edit-trash', item);
                break;
            }
          },
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
        }
      },
      'delegate-position-pagination': createPagination({
        template : '#template-delegate-position-pagination',
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
      'delegate-position-aside': {
        template: '#template-delegate-position-aside',
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
});
