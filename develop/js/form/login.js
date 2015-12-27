define(['jquery', 'vue'], function ($, Vue) {
  var validate = function (value) {
    return this.regexp.test(value);
  };

  var ajaxItems = [
    {
      placeholder: '请输入邮箱/手机号',
      key : 'id',
      value: '',
      required: true,
      error: '邮箱输入错误',
      alert: false,
      regexp: /^(1[\d]{8}|[\w-]+\@[\w-]+\.[\w-]+)$/,
      // 1: phone / email
      validate: validate
    },
    {
      placeholder: '请输入密码',
      key : 'password',
      value: '',
      required: true,
      regexp: null,
      error: '密码输入错误',
      alert: false,
      eye: true,
      validate: function (value) {
        // 1: local check: some rules
        // ? 密码输入错误
        return value.length >= 6;
      }
    }
  ];

  new Vue({
    el: '.login',
    data: {
      list: $.extend(true, [], ajaxItems)
    },
    methods: {
      submit: function (e) {
        e.preventDefault();
        var self = this, failed = false, pwd = null;
        self.list.forEach(function (item) {
          item.alert = !(item.key !== 'password2'
            ? item.validate(item.value)
            : item.validate(item.value, pwd));
          if (item.key === 'password') pwd = item.value;
          if (item.required && item.alert && !failed) failed = true;
        });
        if (failed) // ...
          return false;
      }
    }
  });
}, function (err) {
  throw err;
});
