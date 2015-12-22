;(function (opts) {

  // test:
  // position-detail:
  // home/position/getPositionDetail: userId = 91 positionId = 86

  /**
   * @desc
   * @param {String} jsonString :the string which has been JSON.stringified
   * @param {Function} req :the parent require
   * @param {Function} onload
   * @param {Object} config
   * @return Module
   */
  define({
    load: function (jsonString, req, onload) {
      var json;
      try {
        json = JSON.parse(jsonString);
      } catch (err) {
        throw err;
      }

      json.url = opts.root + json.url;

      req(['$post'], function ($post) {
        $post(json, onload, function (xhr, error) {
          throw new Error('post: ' + json.url + ' :failed, reason:' + error);
        });
      });
    }
  });

})({
  // the base:
  root: 'http://youpinsh.cn/youpin2-backend/index.php/'
});
