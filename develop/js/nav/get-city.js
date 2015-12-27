define(['./ajax-keys', './area'], function (ajaxKeys, area) {
  return function (data) {
    area = data || area;

    var provinces = area.provinces.reduce(function (a, b) {
      a[b.value] = true;
      return a;
    }, {});

    var cities = [];
    var keys = Object.keys(area.citys);
    var key;
    var item;
    var i = -1;
    var len = keys.length;

    while (++i < len) {
      key = keys[i];
      item = {};
      item.name = key;
      item.active = false;
      item.count = false;
      item.isProvince = !!provinces[key];
      item.level = 1;
      item.isCity = true;
      item.ajax = { key: ajaxKeys.city, value: item.name };
      item.sub = area.citys[key].map(function (one) {
        return {
          name : one.value,
          active : false,
          count : false,
          isProvince : false,
          level : 2,
          isCity : true,
          isCityDistrict: true,
          ajax: { key: ajaxKeys.city, value: one.value }
        };
      });
      cities.push(item);
    }

    return cities;
  };
});
