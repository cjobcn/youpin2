requirejs.config({
  baseUrl : '../../js',
  paths: {
    'vue' : 'libs/vue-1.0.8',
    'jquery': 'libs/jquery-2.1.4.min',
    'user-form' : 'modules/user-form',
    'cookie' : 'libs/cookie',
    'post-address' : 'modules/post-address',
    'post-cookie-def' : 'modules/post-cookie-def'
  }
});

require(['jquery', 'vue', 'user-form', 'cookie', 'post-address', 'post-cookie-def'],
  function ($, Vue, userForm, cookie, postAddress, postCookieDef) {
    var posted = false;

  function getCookieDef(date) {
    return {
      domain: postCookieDef.domain,
      path: postCookieDef.path,
      httpOnly: postCookieDef.httpOnly,
      secure: postCookieDef.secure,
      expires : date
    };
  }

  //session ....
  function ifUserLogin(username, password) {
    var docCookie = document.cookie;
    var docSession = document.session;
    var obj = cookie.parse(docCookie);

    var date = new Date();
    date.setTime(date.getTime() + postCookieDef.expires);

    var ret;
    if (!obj[username]) {
      ret = cookie.serialize(username, password, getCookieDef(date)) + ';';
    } else {
      obj[username].expires = date.toUTCString();
      ret = document.cookie += cookie.serialize(username, password, obj[username]);
    }

    console.log(ret);
    document.cookie += ret;
  }

  function handleResponse(res) {
    return true;
  }

  var view = new Vue({
    el : '#form-user',
    data : {
      username : '',
      password : '',
      welcome : false
    },
    computed: {
    },
    methods : {
      onClick : function (e) {
        if (posted)
          return;
        posted = true;

        var self = this;
        var username = this.username;
        var password = this.password;

        $.post(postAddress, {
          data : {
            username : username,
            password : password
          }
        })
        // a 邮箱不存在
        // b 密码错误
        // c 账号被禁用
        .done(function (res) {
          if (handleResponse(res)) {
            ifUserLogin(username, password);
            console.log(res);
            self.welcome = true;
          } else {
            //.........
          }
        })
        .error(function (xhr, err) {
          console.log(err);
        })
        .always(function () {
          posted = false;
        });
        return false;
      }
    }
  })
});