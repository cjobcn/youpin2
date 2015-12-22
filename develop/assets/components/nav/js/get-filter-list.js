define(['jquery'], function ($) {
  return function (data) {
    return $.ajax({
      url: 'http://youpinsh.cn/v2/index.php/Home/position/GetFilterList',
      data: data || {}
    });
  };
});
