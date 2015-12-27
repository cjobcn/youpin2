define(['jquery', 'vue'], function ($, Vue) {
  var validate = function (value) {
    return this.regexp.test(value);
  };

  var ajaxItems = [
    {
      placeholder: '请输入邮箱',
      key : 'email',
      value: '',
      required: true,
      error: '请输入正确的邮箱格式',
      regexp: /^([\w-]+)\@([\w-]+)\.([\w-]+)$/,
      alert: false,
      // 1: email rules check
      validate: validate
    },
    {
      placeholder: '请输入手机号',
      key : 'phone',
      value: '',
      required: true,
      error: '请输入正确的手机号码格式',
      regexp: /^1[\d]{8}$/,
      alert: false,
      // 1: phone rules check
      validate: validate
    },
    {
      placeholder: '请输入QQ号',
      key : 'qq',
      value: '',
      required: true,
      error: '请输入正确的QQ号码格式',
      regexp: /^[1-9][\d]{5,10}$/,
      alert: false,
      validate: validate
    },
    {
      type: 'password',
      placeholder: '请输入密码',
      key : 'password',
      value: '',
      required: true,
      regexp: null,
      error: '密码的长度至少6位',
      alert: false,
      eye: true,
      validate: function (value) {
        // 1: local check: some rules
        return value.length >= 6;
      }
    },
    {
      type: 'password',
      placeholder: '请确认输入密码',
      key : 'password2',
      value: '',
      required: true,
      regexp: null,
      error: '两次输入的密码不一致',
      alert: false,
      eye: true,
      validate: function (value1, value2) {
        // 1: compare the password with password2
        return value1 === value2;
      }
    },
    {
      placeholder: '请输入姓名(必填)',
      key : 'name',
      value: '',
      required: true,
      regexp: /^[\u4E00-\u9FFF]+$/,
      error: '姓名必须是中文',
      alert: false,
      validate: function (value) {
        // 1: local check: 中文汉字
        // 2: remote check: check if already exists
        return value.length >= 2 && this.regexp.test(value);
      }
    },
    {
      placeholder: '请输入英文名(必填)',
      key : 'ename',
      value: '',
      required: true,
      error: '请输入正确的英文名字格式',
      regexp: /[a-zA-Z][\w-]{1,}/,
      alert: false,
      validate: validate
    }
  ];

  new Vue({
    el: '.login',
    data: {
      title: '用户注册',
      companyName: '上海协骏企业管理有限公司',
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
