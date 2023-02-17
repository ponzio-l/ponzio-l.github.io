define(function (require) {
    var app = require('app');
    require("../ngServices/loginService");
    
    app.controller('RootCtrl', ['loginService', '$state', function (loginService) {
        //控制器一旦被实例化，就应该立即向服务器查询登录状态
        var self = this;
        loginService.changeLogin();
        this.isLogin = function () {
            return loginService.getLogin();
        }
        this.getName = function () {
            return loginService.getName();
        }
        this.getEmail = function () {
            return loginService.getEmail();
        }
        this.logout = function () {
            loginService.logout(this.getEmail());
        }
    }]);

});