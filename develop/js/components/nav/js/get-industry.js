define(['./ajax-keys'], function (ajaxKeys) {
  var isObject = function (obj) {
    return obj != null && obj.toString.call({}) === '[object Object]';
  };

  var isArrLike = function (obj) {
    var rnum = /^\d+$/;
    for (var prop in obj) {
      if (!rnum.test(prop))
        return false;
    }
    return true;
  };

  var getSub = function (obj) {
    return obj.children || null;
  };

  var assembleItem = function (obj, arr) {
    var item = {};
    item.sub = [];
    item.sub.level = arr.level + 1;
    item.level = item.sub.level;
    item.active = false;
    item.count = false;
    item.name = obj.name;
    item.parent = arr;
    item.id = obj.id;
    item.isIndustry = true;
    item.ajax = {key: ajaxKeys.industry, value: item.id};
    arr.push(item);
    return item;
  };

  return function getIndustry(obj, arr) {
    if (obj == null)
      throw new Error('getIndustry: no obj');

    if (arr == null) {
      arr = [];
      arr.level = 0;
    }

    if ((isObject(obj) && isArrLike(obj)) || Array.isArray(obj)) {
      $.each(obj, function (_, val) {
        isObject(val) && getIndustry(val, arr);
      });
    } else if (isObject(obj) && obj.name) {
      var item = assembleItem(obj, arr);
      var sub = getSub(obj);
      // ------------------------------
      sub && getIndustry(sub, item.sub);
    } else {
      throw new Error('getIndustry: not array like or object: ' + obj);
    }

    return arr;
  };
});
