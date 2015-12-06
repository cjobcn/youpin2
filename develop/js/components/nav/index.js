define([
  'vue',
  'jquery',
  './js/ajax-keys',
  './js/get-city',
  './js/get-custom',
  './js/get-custom-manager',
  './js/get-industry',
  './js/walker',
  './js/filter-list',
  './js/get-filter-list'
], function (Vue, $, ajaxKeys, getCity, getCustom, getCustomManager, getIndustry, walker, filterList, getFilterList) {
  //var contentList = list.contentList;
  //var testReadyTalentItem = list.testReadyTalentItem;
  //var filterList;

  var listenClickIfLeave = false;

  var tabTitle = new Vue({
    el: '#site-tab-title',
    data: {
      activeIndex: 0,
      tabTitles : [
        { href: '#', name: 'my-position', title : '我的职位' },
        { href: '#', name: 'delegate-position', title : '被委托的职位' },
        { href: '#', name: 'talent-library', title : '人才库' },
        { href: '#', name: 'company-manage', title : '公司管理' }
      ]
    },
    methods: {
      onClick: function (e, item, i) {
        this.activeIndex = i;
        //contentList.activeIndex = this.activeIndex;
        //// --------------------------------------------------
        //if (i == 0) {
        //  contentList.sendAjax({});
        //} else if (i == 1) {
        //  var items = [
        //    $.extend(true, {}, testReadyTalentItem),
        //    $.extend(true, {}, testReadyTalentItem),
        //    $.extend(true, {}, testReadyTalentItem),
        //    $.extend(true, {}, testReadyTalentItem),
        //    $.extend(true, {}, testReadyTalentItem),
        //    $.extend(true, {}, testReadyTalentItem)
        //  ];
        //  contentList.showDataFromBackends(items);
        //}
        return false;
      }
    }
  });

  var positionNav = new Vue({
    el: '#position-nav-main',
    compiled: function () {
      // this.getBackendsData();
      this.createStructure(filterList);
    },
    data: {
      activeIndex: null,
      condition: '',
      activeIndexes : [],
      positionSearchHolder: '搜索',
      positionSearchValue: '',
      list: []
    },
    methods: {
      getBackendsData: function (data) {
        getFilterList(data || {})
          .done(this.createStructure.bind(this))
          .fail(function (xhr, error) {
            console.warn('positionNav: get filterList failed !');
          });
      },
      createStructure: function (data) {
        //console.log(data);
        filterList = data.filter_list;
        // console.log(JSON.stringify(filterList));
        // var industries = getIndustries(filterList.filter_list.industryone);
        var industries = getIndustry(filterList.industry);
        var customers = getCustom(filterList.client_list);
        var cities = getCity();
        var customeManagers = getCustomManager(filterList.manager_list);
        var list = [
          {
            active: false,
            tabTitle : {
              title: '职位状态',
              imgClassName: 'img img-selction img-job-state'
            },
            tabContent: {
              className : 'job-state',
              state : 0,
              items: [
                { name: '发布中职位', count: false, active: false, ajax: { key: ajaxKeys.status, value: 1  }, iconClassName: '' },
                { name: '已关闭职位', count: false, active: false, ajax: { key: ajaxKeys.status, value: 2  }, iconClassName: '' },
                { name: '已暂缓职位', count: false, active: false, ajax: { key: ajaxKeys.status, value: 3  }, iconClassName: '' },
                { name: '已成功职位', count: false, active: false, ajax: { key: ajaxKeys.status, value: 4  }, iconClassName: '' }
              ]
            }
          },
          {
            inputs : '',
            baseLevel: 1,
            active: false,
            tabTitle : {
              title: '行业职能',
              imgClassName: 'img img-selction img-industry-function'
            },
            tabContent: {
              inputs : '',
              className : 'industry-function',
              items : industries
            }
          },
          {
            inputs : '',
            active: false,
            baseLevel: 1,
            tabTitle : {
              title: '城市',
              imgClassName: 'img img-selction img-cities'
            },
            tabContent: {
              className : 'cities',
              items : cities
            }
          },
          {
            inputs : '',
            active: false,
            tabTitle : {
              title: '客户',
              imgClassName: 'img img-selction img-customer'
            },
            tabContent: {
              className : 'customer',
              items : customers
            }
          },
          {
            inputs : '',
            active: false,
            tabTitle : {
              title: '客户经理',
              imgClassName: 'img img-selction img-customer-manager'
            },
            tabContent: {
              className : 'customer-manager',
              items : customeManagers
            }
          }
        ];
        this.$set('list', list);
        if (!listenClickIfLeave) {
          listenClickIfLeave = true;
          this.listenClickIfLeave();
        }
      },
      positionSearchFocus: function (e) {
        this.positionSearchHolder = '';
        return false;
      },
      positionSearchBlur : function (e) {
        this.positionSearchValue = '';
        this.positionSearchHolder = '搜索';
        return false;
      },
      onTitleClick : function (e, item, index) {
        e.preventDefault();
        item.active = !item.active;
        return false;
      },
      onClickIt : function (item, e) {
        // -----------------------------------
        var isCheckbox = e.target.nodeName.toLowerCase() === 'input';
        // -----------------------------------
        var active = item.active;
        // -----------------------------------
        if (isCheckbox) {
          item.count = !item.count;
        } else {
          active = item.active = !item.active;
        }
        // -----------------------------------
        var arr = [];
        // -----------------------------------
        item.count && arr.push({
          name: item.name,
          ajax: { key: item.ajax.key, value: item.ajax.value }
        });
        // -----------------------------------
        if (item.sub) {
          item.sub.forEach(function (one) {
            walker(one, function (one) {
              if (!isCheckbox) {
                one.active = active;
              }
              one.count && arr.push({
                name: one.name,
                ajax: { key: one.ajax.key, value: one.ajax.value }
              });
            });
          });
        }

        // --------------------------------------------
        // pass changes to positionNavResult section
        // --------------------------------------------

        // record the prev length of positionNavResult.items
        var len = positionNavResult.items.length;

        // pass the changes to positionNavResult.items
        arr.forEach(function (v) {
          if (!~positionNavResult.items.indexOf(v.name)) {
            positionNavResult.items.push(v.name);
            positionNavResult.ajaxItems.push(v.ajax);
          }
        });

        // if the len changes, post the data to backends
        if (len !== positionNavResult.items.length) {
          positionNavResult.sendAjax();
        }

        if (isCheckbox) {
          e.stopPropagation();
        } else {
          return false;
        }
      },
      onItemSearchFocus: function (index) {
        this.activeIndex = index;
        return false;
      },
      onItemSearchBlur: function () {
        this.activeIndex = null;
        return false;
      },
      getItem: function (index) {
        index = ~~index;
        return index >= 0 && index < this.list.length
          ? this.list[index]
          : null;
      },
      emptyActiveIndexes: function () {
        if (this.isAllClosed())
          this.activeIndexes = [];
      },
      isAllClosed : function () {
        return this.list.every(function (one) {
          return !one.active;
        });
      },
      closeAll: function (closeSub, emptyInputs) {
        var self = this;
        this.list.forEach(function (one, index) {
          one.active = false;
          if (emptyInputs)
            one.inputs = '';
          if (closeSub) {
            if (index == 2) {
              var cities = self.list[2].tabContent.items;
              cities.forEach(function (one) {
                one.active = false;
              })
            } else if (index == 1) {
              var industries = self.list[1].tabContent.items;
              industries.forEach(function (one) {
                walker(one, function (one) {
                  one.active = false;
                })
              })
            }
          }
        });
        this.emptyActiveIndexes();
      },
      listenClickIfLeave: function () {
        var el = this.$el;
        var self = this;
        function isOutOfPosNav(node) {
          return !$.contains(el, node);
        }
        $('body').click(function (e) {
          if (isOutOfPosNav(e.target) && !self.isAllClosed())
            self.closeAll(true, true);
          return false;
        });
      }
    }
  });

  var positionNavResult = new Vue({
    el: '#position-nav-result',
    data: {
      posting: false,
      results: 0,
      items: [],
      ajaxItems: []
    },
    methods: {
      onClick: function (e, i) {
        e.preventDefault();
        this.items.splice(i, 1);
        this.ajaxItems.splice(i, 1);
        // --------------------------
        this.sendAjax();
        return false;
      },
      empty: function (e) {
        e.preventDefault();
        if (this.items.length) {
          this.items = [];
          this.ajaxItems = [];
          // --------------------------
          this.sendAjax();
        }
        return false;
      },
      setItems: function (items) {
        if (!Array.isArray(items))
          return;
        var arr1 = [];
        var arr2 = [];
        items.forEach(function (one) {
          if (one.name && one.ajax) {
            arr1.push(String(one.name));
            arr2.push(one.ajax);
          }
        });
        this.$set('items', arr1);
        this.$set('ajaxItems', arr2);
        // this.sendAjax();
      },
      collectAjaxData: function () {
        var data = {
          // x
          page: 0,
          // √
          status: 0,
          // x
          client_list: [],
          // x
          manager: [],
          // x
          industry: [],
          // √
          city_list: []
        };
        // -----------------------------------
        this.ajaxItems.forEach(function (one) {
          var key = one.key;
          var value = one.value;
          switch (key) {
            // x
            // case ajaxKeys.page:
            //   data.page = value;
            //   break;
            // √
            case ajaxKeys.status:
              data[ajaxKeys.status] = value;
              break;
            // x
            case ajaxKeys.client:
              data[ajaxKeys.client].push(value);
              break;
            // x
            case ajaxKeys.manager:
              data[ajaxKeys.manager].push(value);
              break;
            // x
            case ajaxKeys.industry:
              data[ajaxKeys.industry].push(value);
              break;
            // √
            // push it into an array
            case ajaxKeys.city:
              data[ajaxKeys.city].push(value);
              break;
          }
        });
        // -----------------------------------
        return data;
      },
      // the fn can receive some feedback about the job of contentList.sendAjax
      sendAjax: function (fn) {
        var data = this.collectAjaxData();
        console.log(data);

        // this.posting ...
        //contentList.sendAjax(data, function (err) {
        //  if (err)
        //    throw err;
        //  else
        //    console.log('post done');
        //});
      }
    }
  });

  // ----------------------------------------------------
  // contentList = contentList.contentList;
  // contentList.$on('tell-position-nav-results', function (len) {
  //   positionNavResult.results = len;
  // });
  // ----------------------------------------------------

  return {
    tabTitle: tabTitle,
    positionNav: positionNav,
    positionNavResult: positionNavResult
  };
});
