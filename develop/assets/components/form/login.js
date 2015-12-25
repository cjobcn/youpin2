requirejs.config({
  baseUrl: './',
  paths: {
    jquery: '../../jquery',
    vue: '../../vue'
  }
});

require(['jquery', 'vue'], function ($, Vue) {
  var validate = function (value) {
    return this.regexp.test(value);
  };

  var ajax = {
    id : {
      key : 'id',
      value: '',
      required: true,
      error: '',
      regexp: /^(1[\d]{8}|[\w-]+\@[\w-]+\.[\w-]+)$/,
      // 1: phone / email
      validate: validate
    },
    password: {
      key : 'password',
      value: '',
      required: true,
      regexp: null,
      error: '',
      validate: function (value) {
        // 1: local check: some rules
        return value.length >= 6;
      }
    }
  };

  var validateKeys = Object.keys(ajax);

  new Vue({
    el: '.login',
    data: {
      failed: '登录信息不正确',
      ajax: $.extend(true, {}, ajax)
    },
    methods: {
      submit: function (e) {
        // *****
        e.preventDefault();
        var self = this, v, failed = [];
        validateKeys.forEach(function (key) {
          v = ajax[key];
          if (v.validate) {
            var ret = false;
            switch (key) {
              case 'id':
              case 'password':
                ret = v.validate(self.ajax[key].value);
                break;
              default:
                //alert(key + ' not in keys');
                break;
            }

            if (v.required) {
              if (ret === false)
                failed.push(self.ajax[key]);
            } else {
              // ......
            }
          }
        });

        if (failed.length) {
          alert(this.failed);
        } else {
          alert('all passed !');
        }
        return false;
      }
    }
  });
}, function (err) {
  throw err;
});
