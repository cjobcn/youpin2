define(['vue'], function (Vue) {
  Vue.transition('expand', {
    beforeEnter: function (item) {},
    enter: function (item) {},
    afterEnter: function (item) {},
    enterCancelled: function (item) {},
    beforeLeave: function (item) {},
    leave: function (item) {},
    afterLeave: function (item) {},
    leaveCancelled: function (item) {}
  });
});
