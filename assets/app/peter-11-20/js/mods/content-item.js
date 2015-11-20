define(['jade', 'jquery'], function (jade, $) {
function template(locals) {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;;
  var locals_for_with = (locals || {});
  (function (data, undefined) {
    jade_mixins["talent"] = function (arr) {
      var block = (this && this.block),
        attributes = (this && this.attributes) || {};
      var maxLevel = 5;
      // iterate arr
      ;
      (function () {
        var $$obj = arr;
        if ('number' == typeof $$obj.length) {

          for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
            var val = $$obj[$index];

            buf.push("<li class=\"info-talent-person\"><p class=\"talent-desc\"><a href=\"#\" class=\"talen-name\">" + (jade.escape((jade_interp = val.name) == null ? '' : jade_interp)) + "</a>");
            if (val.isNew) {
              buf.push("<i class=\"img img-info-new\"></i>");
            }
            buf.push("</p><p class=\"talent-level\">");
            while (val.level-- > 0) {
              buf.push("<i class=\"img img-talent img-talent-level-active\"></i>");
            }
            var left = maxLevel - val.level;
            while (left-- > 0) {
              buf.push("<i class=\"img img-talent img-talent-level\"></i>");
            }
            buf.push("</p></li>");
          }

        } else {
          var $$l = 0;
          for (var $index in $$obj) {
            $$l++;
            var val = $$obj[$index];

            buf.push("<li class=\"info-talent-person\"><p class=\"talent-desc\"><a href=\"#\" class=\"talen-name\">" + (jade.escape((jade_interp = val.name) == null ? '' : jade_interp)) + "</a>");
            if (val.isNew) {
              buf.push("<i class=\"img img-info-new\"></i>");
            }
            buf.push("</p><p class=\"talent-level\">");
            while (val.level-- > 0) {
              buf.push("<i class=\"img img-talent img-talent-level-active\"></i>");
            }
            var left = maxLevel - val.level;
            while (left-- > 0) {
              buf.push("<i class=\"img img-talent img-talent-level\"></i>");
            }
            buf.push("</p></li>");
          }

        }
      }).call(this);

    };
    if (data && data.items) {
      // iterate data.items
      ;
      (function () {
        var $$obj = data.items;
        if ('number' == typeof $$obj.length) {

          for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
            var item = $$obj[$index];

            buf.push("<div class=\"my-position-info-item clearfix\"><div class=\"info-col-t\"><input type=\"checkbox\"/></div><div class=\"info-col-a\"><div class=\"info-desc clearfix\"><h2 class=\"info-position\">" + (jade.escape((jade_interp = item.desc.position) == null ? '' : jade_interp)) + " " + (jade.escape((jade_interp = item.desc.name) == null ? '' : jade_interp)) + "</h2><h3 class=\"info-company\">" + (jade.escape((jade_interp = item.desc.company) == null ? '' : jade_interp)) + "</h3><a href=\"#\" class=\"talent-btn\"><img src=\"images/talent-btn.jpg\" width=\"16\" height=\"16\"/></a></div></div><div class=\"info-col-b\"><div class=\"info-talent-recommending clearfix\"><ul class=\"info-talent-list\">");
            jade_mixins["talent"](item.recommending);
            buf.push("</ul><a href=\"#\" class=\"talent-btn\"><img src=\"images/talent-btn.jpg\" width=\"16\" height=\"16\"/></a></div></div><div class=\"info-col-c\"><div class=\"info-talent-matched clearfix\"><ul class=\"info-talent-list\">");
            jade_mixins["talent"](item.matched);
            buf.push("</ul></div></div><div class=\"info-col-d\"><div class=\"info-talent-update clearfix\"><h5 class=\"ymd\">" + (jade.escape((jade_interp = item.update.ymd) == null ? '' : jade_interp)) + "</h5><h5 class=\"hms\">" + (jade.escape((jade_interp = item.update.hms) == null ? '' : jade_interp)) + "</h5></div></div><div class=\"info-col-e\"><p><a href=\"#\" class=\"img-item-4 img-item-record\"></a><a href=\"#\" class=\"img-item-4 img-item-note\"></a><a href=\"#\" class=\"img-item-4 img-item-heart\"></a><a href=\"#\" class=\"img-item-4 img-item-trash\"></a></p></div></div>");
          }

        } else {
          var $$l = 0;
          for (var $index in $$obj) {
            $$l++;
            var item = $$obj[$index];

            buf.push("<div class=\"my-position-info-item clearfix\"><div class=\"info-col-t\"><input type=\"checkbox\"/></div><div class=\"info-col-a\"><div class=\"info-desc clearfix\"><h2 class=\"info-position\">" + (jade.escape((jade_interp = item.desc.position) == null ? '' : jade_interp)) + " " + (jade.escape((jade_interp = item.desc.name) == null ? '' : jade_interp)) + "</h2><h3 class=\"info-company\">" + (jade.escape((jade_interp = item.desc.company) == null ? '' : jade_interp)) + "</h3><a href=\"#\" class=\"talent-btn\"><img src=\"images/talent-btn.jpg\" width=\"16\" height=\"16\"/></a></div></div><div class=\"info-col-b\"><div class=\"info-talent-recommending clearfix\"><ul class=\"info-talent-list\">");
            jade_mixins["talent"](item.recommending);
            buf.push("</ul><a href=\"#\" class=\"talent-btn\"><img src=\"images/talent-btn.jpg\" width=\"16\" height=\"16\"/></a></div></div><div class=\"info-col-c\"><div class=\"info-talent-matched clearfix\"><ul class=\"info-talent-list\">");
            jade_mixins["talent"](item.matched);
            buf.push("</ul></div></div><div class=\"info-col-d\"><div class=\"info-talent-update clearfix\"><h5 class=\"ymd\">" + (jade.escape((jade_interp = item.update.ymd) == null ? '' : jade_interp)) + "</h5><h5 class=\"hms\">" + (jade.escape((jade_interp = item.update.hms) == null ? '' : jade_interp)) + "</h5></div></div><div class=\"info-col-e\"><p><a href=\"#\" class=\"img-item-4 img-item-record\"></a><a href=\"#\" class=\"img-item-4 img-item-note\"></a><a href=\"#\" class=\"img-item-4 img-item-heart\"></a><a href=\"#\" class=\"img-item-4 img-item-trash\"></a></p></div></div>");
          }

        }
      }).call(this);

    }
  }.call(this, "data" in locals_for_with ? locals_for_with.data : typeof data !== "undefined" ? data : undefined, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined));;
  return buf.join("");
}

// {
//   "update_time": "05月21日 10:48",
//   "position_id": "289",
//   "position_name": "给徐雪霁的互联网简历",
//   "manager_id": "155",
//   "manager_name": "Sigrid",
//   "client_id": "289",
//   "client_bane": null,
//   "recommend_resume": [{
//     "r_resume_id": 1,
//     "r_resume_name": "test",
//     "status": 1
//   }, {
//     "r_resume_id": 2,
//     "r_resume_name": "test",
//     "status": 1
//   }],
//   "Matching_resume": [{
//     "m_resume_id": 1,
//     "m_resume_name": "test"
//   }, {
//     "m_resume_id": 2,
//     "m_resume_name": "test"
//   }]
// }

// {
//   "data" : {
//     "items" : [
//       {
//         "desc" : { "position": "投资部总监/总经理   翠花", "company" : "IBM" },
//         "recommending" : [
//           { "name" : "Jack", "isNew": true, "level": 1 },
//           { "name" : "Jack", "isNew": false, "level": 1 },
//           { "name" : "Jack", "isNew": true, "level": 2 },
//           { "name" : "Jack", "isNew": false, "level": 3 }
//         ],
//         "matched" : [
//           { "name" : "Robert", "isNew": true, "level": 1 },
//           { "name" : "Robert", "isNew": false, "level": 1 },
//           { "name" : "Robert", "isNew": false, "level": 2 },
//           { "name" : "Robert", "isNew": false, "level": 3 }
//         ],
//         "update" : {
//           "ymd" : "2015/10/30",
//           "hms" : "16:00"
//         }
//       }
//     ]
//   }
// }

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
        console.warn('no times');
      item.update.ymd = times[0];
      item.update.hms = times[1];

      data.items.push(item);
    });

    return { data : data };
  }

  return {
    render: function (locals) {
      var container = $('#my-position-info-list .container');
      var str = template(locals);
      container.html(str);
    },
    structure: {
      "desc" : { "position": "", "company" : "", "name" : "" },
      "recommending" : [
        { "name" : "", "isNew": false, "level": 0 }
      ],
      "matched" : [
        { "name" : "", "isNew": false, "level": 0 }
      ],
      "update" : { "ymd" : "", "hms" : "" }
    },
    // input filter
    // http://youpinsh.cn/v2/index.php?s=/Home/position/GetFilterList

    // position list
    getPositionList: function (postData) {
      return $.ajax({
        type: 'post',
        url: "http://youpinsh.cn/v2/index.php?s=/Home/position/GetPositionList",
        // p: n{@Number}
        // p : 3
        data: $.isPlainObject(postData) ? postData : {}
      });
    },

    translatePosted : translatePosted
  }
});