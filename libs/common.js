var path = require('path');
var util = require('util');

module.exports = common;
function common(opts) {
  var amdDeps = opts.deps
    ? opts.deps.map(function (a) {
        return '"' + a + '"';
      }).join(', ')
    : '';

  var cmdDeps = opts.deps
    ? opts.deps.join(', ')
    : '';

  var globalDeps = opts.deps && opts.namespace
    ? opts.deps.map(function (a) {
        return 'global' + getKey(a);
      }).join(', ')
    : '';

  var bufs = [];
    bufs.push(
      ';(function(global, factory) {'
    );
    bufs.push(
        'if (typeof module !== "undefined" && module.exports !== void 0) {'
      +   (opts.requireString || '')
      +   'module.exports = factory(' + cmdDeps + ');'
      + '}'
    );
    bufs.push(
        'else if (typeof define === "function" && define.amd) {'
      +   'define(' + ((opts.amd && opts.namespace && '"' + camelToDash(opts.namespace) + '", ') || '') + '[' + amdDeps + '], factory);'
      + '}'
    );
    if (opts.namespace) {
      bufs.push(
          'else if (global.window === global) {'
        +   'global' + getKey(opts.namespace) + ' = ' + 'factory(' + globalDeps + ');'
        + '}'
      );
    }
    bufs.push(
      '})(this, function(' + cmdDeps + ') {'
      + 'var __exports = {};\n'
    );

    bufs.tail = '; return __exports; });';
    bufs.exports = '__exports';

  return bufs;
}

common.getKey = getKey;
function getKey(name) {
  return /-/.test(name)
    ? '["' + name + '"]'
    : '.' + name;
}

common.camelToDash = camelToDash;
function camelToDash (str) {
  return str.replace(/[A-Z]/g, function (a) {
    return '-' + a.toLowerCase();
  });
}

common.getUrl = getUrl;
function getUrl(url, baseUrl) {
  return !util.isString(url)
    ? null
    : !path.isAbsolute(url)
      ? (baseUrl
        ? path.join(baseUrl, url)
        : path.join(process.cwd(), url))
      : url;
}

common.justName = justName;
function justName(file) {
  return path.basename(file).replace(path.extname(file), '');
}