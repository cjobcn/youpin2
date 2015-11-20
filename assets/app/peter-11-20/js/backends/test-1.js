var a = require('./a.js').filter_list.industryone;
var util = require('util');
var industryone = a.industryone;

function getKey(obj) {
  var keys = Object.keys(obj);
  var rindustry = /industry[\w]+/;
  var key;
  while (!rindustry.test(key = keys.pop()));
  if (rindustry.test(key))
    return obj[key];
}

var obj = {
  industrythree : ['asas']
};

// require('fs').writeFileSync('./b.js', JSON.stringify(a));
// var ret = getKey(obj);
// console.log(ret);

function transfer(obj, arr, depth) {
  arr = arr || [];
  depth = depth == null ? 0 : depth;
  if (depth > 3)
    return arr;

  if (Array.isArray(obj)) {
    obj.forEach(function (one, index) {
      if (Array.isArray(one)) {
        transfer(obj, arr, depth + 1);
      } else if (one && one.name) {
        arr.push({ name: one.name, active: false, depth: depth, sub : [] });
        var it = getKey(one);
        if (it) {
          if (Array.isArray(it))
            transfer(it, arr[arr.length - 1].sub, depth);
          else {
            console.log(it);
          }
        }
      }
    })
  }

  return arr;
}
// console.log(a.length);
// // console.log(a);
// var arr = transfer(a, []);
// console.log(arr);

