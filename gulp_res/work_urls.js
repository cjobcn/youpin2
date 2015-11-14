var workUrls = [
  {
    name : 'jade',
    src : './assets/jade/**/**/*.jade',
    out : './assets/htmls',
    message : ''
  },
  {
    name : 'sass',
    src : './assets/sass/**/**/*.scss',
    out : './assets/css',
    message : ''
  }
];
workUrls.findUrl = function (name) {
  var i = -1;
  var ret;
  while (++i < workUrls.length) {
    if (workUrls[i] && workUrls[i].name === name) {
      ret = workUrls[i];
      break;
    }
  }

  if (!ret)
    throw new Error('no urls for the given name: ' + name);
  return ret;
};

module.exports = workUrls;