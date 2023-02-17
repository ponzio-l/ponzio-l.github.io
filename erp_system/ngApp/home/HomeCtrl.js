define(function (require) {
    var app = require('app');
    // require('jquery');  //var $ = require('jquery');为什么不用变量接收，因为jquery的原理就是给window对象添加属性
    // require('jquery-ui');
    app.controller('HomeCtrl', ['titleService', function (titleService) {
        //更改标题
        titleService.setTitle("首页");
    }]);
    
});
  