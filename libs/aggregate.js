var fs   = require('fs');
var jade = require('jade');
var path = require('path');
var util = require('util');
var common = require('./common.js');
var getKey = common.getKey;
var getUrl = common.getUrl;
var justName = common.justName;
var baseUrl;
var jadeHome;
var jsHome;

module.exports = aggregate;
/**
 * @desc: compile jade views to js file
 * @Note: should not add file extname
 * @param: opts {Object}:
 *    @param: inputs:        {Array}  contains url{@String}
 *    @param: output :       {String}
 *    @param: amd:           {Boolean}
 *    @param: namespace:     {String}
 *    @param: deps:          {Array}   contains dep{@String}
 *    @param: requireString: {String}  to set common js require vars;
 * @param: callback {Function}
 */
function aggregate(opts, callback) {
  if (!jadeHome || !jsHome)
    return callback(new Error('no jadeHome or no jsHome'));
  if (!util.isArray(opts.inputs))
    return callback(new Error('inputs not a array'));
  if (!opts.output)
    return callback(new Error('no output'));

  opts.inputs = opts.inputs.map(function (one) {
    return path.join(jadeHome, one + '.jade');
  });

  opts.output = path.join(jsHome, opts.output + '.js');

  compileView(opts, callback);
}

aggregate.setHome = function (_jadeHome, _jsHome) {
  jadeHome = getUrl(_jadeHome, baseUrl);
  jsHome = getUrl(_jsHome, baseUrl);
};

aggregate.setBaseUrl = function (_baseUrl) {
  baseUrl = getUrl(_baseUrl);
};

aggregate.getHomes = function () {
  return {
    baseUrl : baseUrl,
    jadeHome : jadeHome,
    jsHome : jsHome
  };
};

function compileView(opts, callback) {
  opts.amd = opts.amd === void 0 ? false : !!opts.amd;
  var bufs = common(opts);

  try {
    opts.inputs = opts.inputs.map(getCompiledString(bufs.exports)).join(';\n') + ';\n';
  } catch (err) { return callback(err) }

  bufs.push(opts.inputs);
  bufs.push(bufs.tail);

  var ret = bufs.join('');

  fs.writeFile(opts.output, ret, callback);
}

function getCompiledString(__exports) {
  return function (input) {
    var name = justName(input);
    // { name: name }
    var strFn = jade.compileFileClient(input);
    return __exports + getKey(name) + ' = ' + strFn;
  };
}