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
    email: {
      key : 'email',
      value: '',
      required: true,
      error: '请输入正确的邮箱格式',
      regexp: /^([\w-]+)\@([\w-]+)\.([\w-]+)$/,
      // 1: email rules check
      validate: validate
    },
    phone: {
      key : 'phone',
      value: '',
      required: true,
      error: '请输入正确的手机号码格式',
      regexp: /^1[\d]{8}$/,
      // 1: phone rules check
      validate: validate
    },
    qq: {
      key : 'qq',
      value: '',
      required: true,
      error: '请输入正确的QQ号码格式',
      regexp: /^[1-9][\d]{5,10}$/,
      validate: validate
    },
    password: {
      key : 'password',
      value: '',
      required: true,
      regexp: null,
      error: '密码的长度至少6位',
      validate: function (value) {
        // 1: local check: some rules
        return value.length >= 6;
      }
    },
    password2: {
      key : 'password2',
      value: '',
      required: true,
      regexp: null,
      error: '两次输入的密码不一致',
      validate: function (value1, value2) {
        // 1: compare the password with password2
        return value1.length >= 6 && value1 === value2;
      }
    },
    name: {
      key : 'name',
      value: '',
      required: true,
      regexp: /^[\u4E00-\u9FFF]+$/,
      error: '姓名必须是中文',
      validate: function (value) {
        // 1: local check: 中文汉字
        // 2: remote check: check if already exists
        return value.length >= 2 && this.regexp.test(value);
      }
    },
    ename: {
      key : 'ename',
      value: '',
      required: true,
      error: '请输入正确的英文名字格式',
      regexp: /[a-zA-Z][\w-]{1,}/,
      validate: validate
    }
  };

  var validateKeys = Object.keys(ajax);

  new Vue({
    el: '.login',
    data: {
      title: '用户注册',
      companyName: '上海协骏企业管理有限公司',
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
              case 'email':
              case 'phone':
              case 'qq':
              case 'name':
              case 'ename':
              case 'password':
                ret = v.validate(self.ajax[key].value);
                break;
              case 'password2':
                ret = v.validate(self.ajax['password'].value, self.ajax[key].value);
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
          var str = '';
          failed.forEach(function (v) {
            str += v.key + ' ';
          });
          alert(str + ' => not passed');
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
