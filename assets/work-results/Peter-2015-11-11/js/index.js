;(function (Vue) {
  var header = new Vue({
    el: '#header',
    data: {
      logo : {
        href : '#',
        src : 'images/site-logo.jpg',
        width : '214',
        height : '60'
      },
      imgs : [
        { isNew : true,  href: '#', className: 'img-hm-person' },
        { isNew : false, href: '#', className: 'img-hm-info' },
        { isNew : false, href: '#', className: 'img-hm-mail' },
        { isNew : false, href: '#', className: 'img-hm-switch' }
      ]
    }
  });

  var tabTitle = new Vue({
    el: '#site-tab-title',
    data: {
      tabTitles : [
        { href: '#', title : '我的职位' },
        { href: '#', title : '被委托的职位' },
        { href: '#', title : '人才库' },
        { href: '#', title : '公司管理' }
      ]
    }
  });

  var positionNav = new Vue({
    el: '#position-nav-main',
    data: {
      list : [
        {
          tabTitle : {
            title: '职位状态',
            imgClassName: 'img img-selction img-job-state'
          }
        },
        {
          tabTitle : {
            title: '行业职能',
            imgClassName: 'img img-selction img-industry-function'
          }
        },
        {
          tabTitle : {
            title: '城市',
            imgClassName: 'img img-selction img-cities'
          }
        },
        {
          tabTitle : {
            title: '客户',
            imgClassName: 'img img-selction img-customer'
          }
        },
        {
          tabTitle : {
            title: '客户经理',
            imgClassName: 'img img-selction img-customer-manager'
          }
        }
      ]
    }
  });

  var positionContentTitle = new Vue({
    el: '#my-position-content-title',
    data: {
      title: {
        position: '职位',
        recommending: '推荐中人才',
        matched: '匹配人才',
        update: '更新时间'
      }
    }
  });

  var item = {
    desc : { position: "投资部总监/总经理   翠花", company : "IBM" },
    recommending : [
      { name : "Jack", isNew: true, level: [true, true, false, false, false] },
      { name : "Jack", isNew: false, level: [true, true, false, false, false] },
      { name : "Jack", isNew: true, level: [true, true, true, false, false] },
      { name : "Jack", isNew: false, level: [true, true, true, false, false] }
    ],
    matched : [
      { name : "Robert", isNew: true, level: [true, true, true, true, false] },
      { name : "Robert", isNew: false, level: [true, false, false, false, false] },
      { name : "Robert", isNew: false, level: [true, false, false, false, false] },
      { name : "Robert", isNew: false, level: [true, false, false, false, false] }
    ],
    update : {
      ymd : "2015/10/30",
      hms : "16:00"
    }
  };

  var items = [];
  repeat(12, function () {
    items.push(item);
  });

  function repeat(times, fn) {
    times = ~~times;
    while (times-- >= 0) fn();
  }

  // *** this would not work ***
  // var positionInfoList = new Vue({
  //   el: '#my-position-info-list',
  //   data: {
  //     items : items
  //   }
  // });
})(Vue);