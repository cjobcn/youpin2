define(function () {
  var I_HIDDEN_AT_FIRST = 6;
  var I_ALL_LEVEL = 5;

  var assembleDesc = function (item, one) {
    item.desc = {};
    item.desc.position = one['position_name'] || '';
    item.desc.company = one['client_name'] || '';
    item.desc.name = one['manager_name'] || '';
    item.desc.active = false;
  };

  var assembleRecommanding = function (item, one) {
    item.recommending = [];

    // -------------------------------
    // one['recommend_resume'] 有值null的情况
    one['recommend_resume'] = one['recommend_resume'] || [];

    // -------------------------------
    one['recommend_resume'].forEach(function (v, index) {
      v.status = v.status == null
        ? 0
        : ~~v.status;

      var rec = {};
      rec.name = v['resume_name'] || '';
      rec.isNew = false;
      rec.level = v.status > I_ALL_LEVEL ? I_ALL_LEVEL : v.status < 0 ? 0 : v.status;
      // people whoes index < 4(default) should be hidden at first
      rec.active = index < I_HIDDEN_AT_FIRST;

      item.recommending.push(rec);
    });

    item.recommending.active = false;
  };

  var assembleMatched = function (item, one) {
    item.matched = [];

    one['Matching_resume'].forEach(function (v) {
      if (v.status == null)
        v.status = 0;
      else
        v.status = ~~v.status;

      var matched = {};
      matched.name = v['m_resume_name'] || '';
      matched.isNew = false;
      matched.level = v.status > I_ALL_LEVEL ? I_ALL_LEVEL : v.status < 0 ? 0 : v.status;

      item.matched.push(matched);
    });
  };

  var assembleUpdate = function (item, one) {
    item.update = {};

    var times = one['update_time'].split(' ');
    if (!times || !times.length)
      console.warn('position.update_time -> no times');

    item.update.ymd = times[0] || '';
    item.update.hms = times[1] || '';
  };

  var assembleNotes = function (item) {
    item.notes = [
      { href: "#", desc: "record", className: "img-item-record" },
      { href: "#", desc: "note", className: "img-item-note" },
      { href: "#", desc: "heart", className: "img-item-heart" },
      { href: "#", desc: "trash", className: "img-item-trash" }
    ];
  };

  return function translatePosted(res) {
    var data = {};
    data.items = [];

    res.position.forEach(function (one) {
      var item = {};

      item.count = false;
      item.active = false;
      assembleDesc(item, one);
      assembleRecommanding(item, one);
      assembleMatched(item, one);
      assembleUpdate(item, one);
      assembleNotes(item);

      data.items.push(item);
    });

    return data;
  };
});
