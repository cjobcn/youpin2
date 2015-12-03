define(['../vue', 'jquery', '../backends/area', '../backends/filter-list', './content-list'],
  function (Vue, $, area, filterList, contentList) {

  // 城市和客户支持多选，其他单选；行业职能，你只用把选中的职能id给我，不用管父子职能
  // $.ajax({
  //   "type": "post",
  //   // position list
  //   "url": "http://youpinsh.cn/v2/index.php/Home/Position/GetPositionList",
  //   "data": {
  //     // page: n{@Number}
  //     "page": 1,
  //     // 职位发布中
  //     //"status": 1
  //     "status": 1,
  //     // "show_name": "精锐资本",
  //     // "id": "242",
  //     "client_list": 242,
  //     // "real_name": "孙还还",
  //     // "id": "109",
  //     "manager": 109,
  //     // "name": "工程类",
  //     // "id": "62",
  //     "industry": 62,
  //     // city name
  //     "city_list": ["上海", "北京"]
  //   }
  // });

  var getIndustries = (function () {
    var util = {};

    util.isObject = function (obj) {
      return obj != null &&
        obj.toString.call({}) === '[object Object]';
    };

    function iterate(obj, arr) {
      if (obj == null)
        throw new Error('getIndustries: no obj');
      if (arr == null) {
        arr = [];
        arr.level = 0;
      }

      if ((util.isObject(obj) && isArrLike(obj)) || $.isArray(obj)) {
        $.each(obj, function (_, val) {
          util.isObject(val) && iterate(val, arr);
        });
      } else if (util.isObject(obj)) {
        if (!obj.name)
          throw new Error('getIndustries: obj should have a name: ' + JSON.stringify(obj));
        var item = buildFunctionalityItem(obj, arr);
        var sub = objGetSub(obj);
        sub && iterate(sub, item.sub);
      } else {
        throw new Error('getIndustries: not array like or object: ' + obj);
      }

      return arr;
    }

    function buildFunctionalityItem(obj, arr) {
      var item = {};
      item.sub = [];
      item.sub.level = arr.level + 1;
      item.level = item.sub.level;
      item.active = false;
      item.count = false;
      item.name = obj.name;
      item.parent = arr;
      item.id = obj.id;
      item.isIndustry = true;
      item.ajax = { key: ajaxKeys.industry, value: item.id };
      arr.push(item);
      return item;
    }

    function isArrLike(obj) {
      var rnum = /^\d+$/;
      for (var prop in obj) {
        if (!rnum.test(prop))
          return false;
      }
      return true;
    }

    //-------------------------------------
    function objGetSub(obj) {
      return obj.children || null;
    }

    return iterate;
  })();

  var ajaxKeys = {
   //@Param {Number}
   "page": "page",
   //@Param {Number}
   "status": "status",
   //@Param {Number}
   "client": "client_list",
   //@Param {Number}
   "manager": "manager",
   //@Param {Number}
   "industry": "industry",
   //@Param {Array} with {String}
   "city": "city_list"
  };

  function getCities() {
    var provinces = area.provinces.reduce(function (a, b) {
      a[b.value] = true;
      return a;
    }, {});

    var cities = [];
    var keys = Object.keys(area.citys);
    var len = keys.length;
    var item;
    var key;
    var i = -1;
    while (++i < len) {
      key = keys[i];
      item = {};
      item.name = key;
      item.active = false;
      item.count = false;
      item.isProvince = !!provinces[key];
      item.level = 1;
      item.isCity = true;
      item.ajax = { key: ajaxKeys.city, value: item.name };
      item.sub = area.citys[key].map(function (one) {
        return {
          name : one.value,
          active : false,
          count : false,
          isProvince : false,
          level : 2,
          isCity : true,
          isCityDistrict: true,
          ajax: { key: ajaxKeys.city, value: one.value }
        };
      });
      cities.push(item);
    }
    return cities;
  }

  function getCustomerManagers() {
    return filterList['filter_list']['manager_list'].map(function (one) {
      return {
        name : one['real_name'],
        id: one.id,
        isCustomerManager: true,
        active: false,
        count : false,
        ajax : { key: ajaxKeys.manager, value: one.id }
      };
    });
  }

  function getCustomers() {
    return filterList['filter_list']['client_list'].map(function (one) {
      return {
        name : one['show_name'],
        id: one.id,
        isCustomer: true,
        active: false,
        count : false,
        ajax : { key: ajaxKeys.client, value: one.id }
      }
    });
  }

  function walker(item, callback, base) {
    if (item == null)
      return;

    if (base == null)
      base = 1;

    callback(item, base);

    if ($.isArray(item.sub)) item.sub.forEach(function (one) {
      if (one && one.sub)
        walker(one, callback, base + 1);
      else
        callback(one, base + 1);
    });
  }

  function getFilterList(data) {
    return $.ajax({
      url: 'http://youpinsh.cn/v2/index.php/Home/position/GetFilterList',
      data: data || {}
    });
  }

  var filterList;
  var listenClickIfLeave = false;

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
        this.getFilterList(data || {})
        .done(this.createStructure.bind(this))
        .fail(function (xhr, error) {
          console.warn('positionNav: get filterList failed !');
        });
      },
      createStructure: function (data) {
        filterList = data;
        // console.log(JSON.stringify(filterList));
        // var industries = getIndustries(filterList.filter_list.industryone);
        var industries = getIndustries(filterList.filter_list.industry);
        var customers = getCustomers();
        var cities = getCities();
        var customeManagers = getCustomerManagers();
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
          positionNavResult.sendAjax()
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
      figourOutItemlocation: function (item) {
        var index;
        if (item.isIndustry) index = 0;
        else if (item.isCity) index = 1;
        else if (item.isCustomer) index = 2;
        else if (item.isCustomerManager) index = 3;
        if (index == null)
          throw new Error('figourOutItemlocation: have not catch the index');
        return index;
      },
      countActiveIndexes: function (item) {
        var index = this.figourOutItemlocation(item);
        if (item.active) {
          if (!~this.activeIndexes.indexOf(index)) {
            this.activeIndexes.push(index);
          }
        } else {
          var at = this.activeIndexes.indexOf(index);
          this.activeIndexes.splice(at, 1);
        }
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
      },
      getFilterList : getFilterList,
      getIndustries : getIndustries,
      getCities: getCities,
      getCustomerManagers: getCustomerManagers,
      getCustomers: getCustomers
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
        // console.log(data);

        // this.posting ...
        contentList.sendAjax(data, function (err) {
          if (err)
            throw err;
          else
            console.log('post done');
        });
      }
    }
  });

  // ----------------------------------------------------
  contentList = contentList.contentList;
  contentList.$on('tell-position-nav-results', function (len) {
    positionNavResult.results = len;
  });
  // ----------------------------------------------------
  return positionNav;
});
