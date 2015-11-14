requirejs.config({
  baseUrl : '../../js',
  paths: {
    'vue' : 'libs/vue-0.12.16.min',
    'jquery': 'libs/jquery-2.1.4.min',
    'handle-store' : 'modules/handle-store',
    'todos' : 'modules/todos'
  }
});

require(['todos'], function (todos) {
  console.log(todos);
});