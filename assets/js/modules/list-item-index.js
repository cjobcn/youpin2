define(['vue'], function (Vue) {
  // ------------------------------------
  // return function (id, data) {
  //   return new Vue({
  //     el : id,
  //     data : data
  //   });
  // }
  // ------------------------------------

  // #demo

  var component = Vue.component('list-item', {
    template : '#list-item',
    data : function () {
      return {};
    }
  });

  var posList = new Vue({
    el: '#my-position-info-list',
    data: {
      items : [
        {
          desc : { name : "翠花", position: "销售部总监", company: "IBM" },
          recommending : [
            { name : "圣诞树", isNew : true, level1 : 1, level2: 4  },
            { name : "圣诞树", isNew : true, level1 : 1, level2: 4  },
            { name : "圣诞树", isNew : true, level1 : 1, level2: 4  },
            { name : "圣诞树", isNew : true, level1 : 1, level2: 4  },
          ],
          matched : [
            { name : "圣诞树2", isNew : true, level1 : 2, level2: 3  },
            { name : "圣诞树2", isNew : true, level1 : 2, level2: 3  },
            { name : "圣诞树2", isNew : true, level1 : 2, level2: 3  },
            { name : "圣诞树2", isNew : true, level1 : 2, level2: 3  }
          ],
          update : { ymd : '2015/10/30', hms : '16:00' }
        },
      ]
    }
  });
  posList.$append(component);
})