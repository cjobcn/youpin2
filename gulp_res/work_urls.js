var workUrls = [
  {
    name : 'jade',
    src : './develop/jade/**/**/*.jade',
    out : './develop',
    message : ''
  },
  {
    name : 'sass',
    src : './develop/sass/**/**/*.scss',
    out : './develop/css',
    message : ''
  }
];
workUrls.findUrl = function (name) {
  var ret;
  var i = -1;
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
