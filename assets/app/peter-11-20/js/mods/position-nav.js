define(['vue', 'jquery', 'area', 'filter-list'], function (Vue, $, area, filterList) {
  var getIndustries = (function () {
    var util = {};
    util.isObject = function (obj) {
      return obj != null &&
        obj.toString.call({}) === '[object Object]';
    };

    util.isArray = Array.isArray;

    function iterate(obj, arr) {
      if (obj == null)
        throw new Error('no obj');
      if (arr == null) {
        arr = [];
        arr.level = 0;
      }

      if (util.isObject(obj)) {
        if (isArrLike(obj)) {
          var val;
          for (var prop in obj) {
            val = obj[prop];
            if (val && typeof val === 'object') {
              iterate(val, arr);
            }
          }
        } else {
          if (!obj.name)
            throw new Error('obj should has a name ' + obj);

          var item = {};
          item.sub = [];
          item.sub.level = arr.level + 1;
          item.level = item.sub.level;
          item.active = false;
          item.name = obj.name;
          item.parent = arr;
          arr.push(item);

          var sub = objGetSub(obj);
          if (sub) {
            iterate(sub, item.sub);
          }
        }
      } else if (util.isArray(obj)) {
        obj.forEach(function () {
          if (val && typeof val === 'object') {
            iterate(val, arr);
          }
        });
      } else {
        throw new Error('not array or object');
      }

      return arr;
    }

    function isArrLike(obj) {
      var rnum = /^\d+$/;
      var ret = true;
      for (var prop in obj) {
        if (!rnum.test(prop)) {
          return false;
        }
      }
      return true;
    }

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
      item.level = item.isProvince ? 2 : 1;
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
        name : one['real_name']
      };
    });
  }

  function getCustomers() {
    return filterList['filter_list']['client_list'].map(function (one) {
      return {
        name : one['show_name']
      }
    });
  }

  function walker(item, callback, base) {
    if (item == null)
      return;

    if (base == null)
      base = 1;

    callback(item, base);

    if ($.isArray(item.sub))
      item.sub.forEach(function (one) {
        if (one && one.sub)
          walker(one, callback, base + 1)
        else
          callback(one, base + 1);
      });
  }

  function getFilterList() {
    return $.post('http://youpinsh.cn/v2/index.php/Home/position/GetFilterList');
  }

  var industries = getIndustries(filterList.filter_list.industryone);
  var customers = getCustomers();
  var cities = getCities();
  var customeManagers = getCustomerManagers();
  // console.log(JSON.stringify(industries));
  var positionNav = new Vue({
    el: '#position-nav-main',
    data: {
      positionSearchHolder: '搜索',
      positionSearchValue: '',
      list : [
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
          baseLevel: 1,
          active: false,
          tabTitle : {
            title: '行业职能',
            imgClassName: 'img img-selction img-industry-function'
          },
          tabContent: {
            className : 'industry-function',
            items : industries
          }
        },
        {
          active: false,
          baseLevel: 1,
          tabTitle : {
            title: '城市',
            imgClassName: 'img img-selction img-cities'
          },
          tabContent: {
            inputs : '',
            className : 'cities',
            items : cities
          }
        },
        {
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
      ]
    },
    methods: {
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
      onEnter : function (item) {
        item.active = !item.active;
        return false;
      },
      onLeave : function (item) {
        item.active = !item.active;
        return false;
      },
      onClickCity : function (item) {
        item.active = !item.active;
        console.log(item.level);
        return false;
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