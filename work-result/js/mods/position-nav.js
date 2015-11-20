define(['vue', 'jquery', 'area', 'filter-list'], function (Vue, $, area, filterList) {
  // console.log(filterList);

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
      item.subs = area.citys[key].map(function (one) {
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

  // var industryone = filterList['filter_list']['industryone'];
  // console.log(industryone);

  var keys = ['industryone', 'industrytwo', 'industrythree'];
  function getIndustries(target, arr, depth) {
    if (depth == null) {
      depth = 0;
      target = $.makeArray(filterList['filter_list']['industryone'], []);
    }
    arr = arr || [];

    var key = keys[depth];

    if (!Array.isArray(target)) {
      if (!target.name)
        return arr;
        // throw new Error('no ---> target name' + JSON.stringify(target));
      arr.push({ name : target.name, active: false , sub : [] });
      if (!key || !target[key])
        return arr;
    } else {
      target.forEach(function (one, index) {
        if (!one.name)
          throw new Error('no one name');
        var item = {};
        item.name = one.name;
        item.active = false;
        item.sub = [];

        if (one[keys[depth + 1]]) {
          item.sub = getIndustries(one[keys[depth + 1]], item.sub, depth + 1);
        }
        arr.push(item);
      });
    }

    return arr;
  }
  var industries = getIndustries();

  var customers = filterList['filter_list']['client_list'].map(function (one) {
    return {
      name : one['show_name']
    }
  });

  function getFilterList() {
    return $.post('http://youpinsh.cn/v2/index.php/Home/position/GetFilterList');
  }
  // getFilterList().done(function (res) {
  //   // console.log(JSON.stringify(res));
  //   console.log(res);
  // })
  // .error(function (a, b) {
  //   console.log(b);
  // })

  var cities = getCities();
  var customeManagers = getCustomerManagers();

// console.log(industries);

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
        return false;
      },
      onClickSubCity : function (item) {
        return false;
      },
      getFilterList : getFilterList
    }
  });
  return positionNav;
});