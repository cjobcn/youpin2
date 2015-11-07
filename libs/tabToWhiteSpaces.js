// Note:
//  1) \n : if exist explictly, better wrapped alone, like: '\n'
//  2) ['"\/]\n+{sth}\n+['"\/] is forbidden
module.exports = tabToWhiteSpaces;
function tabToWhiteSpaces(str, num) {
  num = ~~num;
  num = num > 2 ? num : 2;
  var whiteSpaces = repeatStr(' ', num);
  var specials = collectSpecials(str);
  var renter = /\n(\t+)/g;
  return str.replace(renter, function (all, tab, index) {
    if (~specials.indexOf(index))
      return all;
    return repeatStr(whiteSpaces, tab.length, '\n');
  });
}

function collectMod(str, mod, tail, ret) {
  var rspecial = new RegExp('(' + mod + ')(\n+)' + '[^\n]*?' + tail, 'g'),
    one, index, len;
  while (one = rspecial.exec(str)) {
    len = one[2].length;
    index = one.index + one[1].length;
    while (len--) if (!~ret.indexOf(index)) ret.push(index++);
  }
}

function collectSpecials(str) {
  var ret = [];
  collectMod(str, "['][^']*?", "'", ret);
  collectMod(str, '["][^"]*?', '"', ret);
  collectMod(str, '[/][^/]*?', '/', ret);
  return ret.sort(function (a, b) {
    return a - b;
  });
}

function repeatStr(str, n, head) {
  head = typeof head === 'string' ? head : '';
  n = ~~n;
  if (n < 1) return head;
  if (typeof str !== 'string') return head;
  while (n--) head += str;
  return head;
}