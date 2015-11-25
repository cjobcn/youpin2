define(['vue', 'jquery'], function (Vue, $) {
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
  return positionContentTitle;
});