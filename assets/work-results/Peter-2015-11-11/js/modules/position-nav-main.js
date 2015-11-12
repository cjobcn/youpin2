define(['vue'], function (Vue) {
  var positionNavMain = new Vue({
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

  return positionNavMain;
});