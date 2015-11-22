define(['vue','jquery'], function (Vue, $) {
  function translatePosted(res) {
    var data = {};
    data.items = [];

    res.position.forEach(function (one) {
      var item = {};
      //
      item.desc = {};
      item.desc.position = one['position_name'];
      item.desc.company = '';
      item.desc.name = '';

      //
      item.recommending = [];
      one['recommend_resume'].forEach(function (v) {
        if (v.status == null)
          v.status = 0;
        else
          v.status = ~~v.status;
        var rec = {};
        rec.name = v['r_resume_name'];
        rec.isNew = false;
        rec.level = v.status > 5 ? 5 : v.status < 0 ? 0 : v.status;
        item.recommending.push(rec);
      });

      //
      item.matched = [];
      one['Matching_resume'].forEach(function (v) {
        if (v.status == null)
          v.status = 0;
        else
          v.status = ~~v.status;
        var matched = {};
        matched.name = v['m_resume_name'];
        matched.isNew = false;
        matched.level = v.status > 5 ? 5 : v.status < 0 ? 0 : v.status;
        item.matched.push(matched);
      });

      //
      item.update = {};
      item.update.ymd = '';
      item.update.hms = '';
      var times = one['update_time'].split(' ');
      if (!times || !times.length)
        console.warn('position.update_time -> no times');
      item.update.ymd = times[0];
      item.update.hms = times[1];

      data.items.push(item);
    });

    return { data : data };
  }

  return new Vue({
    el: '#my-position-info-list',
    data: {},
    compiled: function () {
      var self = this;
      $.ajax({
        type: 'post',
        url: "http://youpinsh.cn/v2/index.php?s=/Home/position/GetPositionList",
        data: this.getReadyPostData()
      })
      .done(function (res) {
        self.$data = translatePosted(res).data;
        self.$emit('data-loaded');
      })
      .error(function (xhr, error) {
        console.warn('error: load data for position list failed');
      });
    },
    methods: {
      getReadyPostData: function (data) {
        return {}
      }
    },
    components: {
      "position-item" : {
        template: '#template-position-item',
        components: {
          "talent-recommending": {
            template: '#template-talent-recommending'
          },
          "talent-matched": {
            template: '#template-talent-matched'
          }
        }
      }
    }
  });
});