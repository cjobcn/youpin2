define(['vue', 'jquery', 'area'], function (Vue, $, area) {
  var getIndustries = (function () {
    var util = {};

    util.isObject = function (obj) {
      return obj != null &&
        obj.toString.call({}) === '[object Object]';
    };

    function iterate(obj, arr) {
      if (obj == null)
        throw new Error('no obj');
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
          throw new Error('obj should has a name ' + obj);
        var item = getItem(obj, arr);
        var sub = objGetSub(obj);
        sub && iterate(sub, item.sub);
      } else {
        throw new Error('not array like or object');
      }

      return arr;
    }

    function getItem(obj, arr) {
      var item = {};
      item.sub = [];
      item.sub.level = arr.level + 1;
      item.level = item.sub.level;
      item.active = false;
      item.name = obj.name;
      item.parent = arr;
      item.isIndustry = true;
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
    // this step should be discussed
    //-------------------------------------
    function objGetSub(obj) {
      return obj['industryone'] ||
        obj['industrytwo'] ||
        obj['industrythree'] ||
        null;
    }

    return iterate;
  })();

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
      item.isProvince = !!provinces[key];
      item.level = item.isProvince ? 1 : 2;
      item.isCity = true;
      item.sub = area.citys[key].map(function (one) {
        return one.value;
      });
      cities.push(item);
    }
    return cities;
  }

  function getCustomerManagers() {
    return filterList['filter_list']['manager_list'].map(function (one) {
      return {
        name : one['real_name'],
        isCustomerManager: true
      };
    });
  }

  function getCustomers() {
    return filterList['filter_list']['client_list'].map(function (one) {
      return {
        name : one['show_name'],
        isCustomer: true
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
        walker(one, callback, base + 1)
      else
        callback(one, base + 1);
    });
  }

  function getFilterList() {
    return $.post('http://youpinsh.cn/v2/index.php/Home/position/GetFilterList');
  }

  var filterList;
  var listenClickIfLeave = false;

  var positionNav = new Vue({
    el: '#position-nav-main',
    compiled: function () {
      this.getBackendsData();
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
      getBackendsData: function () {
        this.getFilterList()
        .done(this.createStructure.bind(this))
        .fail(function (xhr, error) {
          console.warn('positionNav: get filterList failed !');
        });
      },
      createStructure: function (data) {
        filterList = data;
        var industries = getIndustries(filterList.filter_list.industryone);
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
                { value: '发布中职位', iconClassName: '' },
                { value: '已关闭职位', iconClassName: '' },
                { value: '已暂缓职位', iconClassName: '' },
                { value: '已成功职位', iconClassName: '' }
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
      onClickIt : function (item) {
        item.active = !item.active;
        return false;
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
  return positionNav;
});