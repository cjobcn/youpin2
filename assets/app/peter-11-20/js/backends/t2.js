var util = require('util');

function iterate(obj, arr) {
  if (obj == null)
    throw new Error('no obj');
  arr = arr || [];

  if (util.isObject(obj)) {
    if (isArrLike(obj)) {
      var val;
      for (var prop in obj) {
        val = obj[prop];
        if (val && typeof val === 'object') {
          iterate(val, arr);
        }
      }
    } else {
      if (!obj.name)
        throw new Error('obj should has a name ' + obj);

      var item = {};
      item.sub = [];
      item.active = false;
      item.name = obj.name;
      arr.push(item);

      var sub = objGetSub(obj);
      if (sub) {
        iterate(sub, item.sub);
      }
    }
  } else if (util.isArray(obj)) {
    obj.forEach(function () {
      if (val && typeof val === 'object') {
        iterate(val, arr);
      }
    });
  } else {
    throw new Error('not array or object');
  }

  return arr;
}

function isArrLike(obj) {
  var rnum = /^\d+$/;
  var ret = true;
  for (var prop in obj) {
    if (!rnum.test(prop)) {
      return false;
    }
  }
  return true;
}

function objGetSub(obj) {
  return obj['industryone'] ||
    obj['industrytwo'] ||
    obj['industrythree'] ||
    null;
}

var data = require('./a.js').filter_list.industryone;
// console.log(data);
var arr = iterate(data);
console.log(arr);
// console.log(1);