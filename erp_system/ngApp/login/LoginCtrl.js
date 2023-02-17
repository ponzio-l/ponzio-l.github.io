define(function (require) {
    var app = require("app");
      // require("../ngServices/loginService");  rootCtrl已经声明了依赖，此处不用再require
    app.controller("LoginCtrl", [
        'titleService',
        '$state',
        'loginService',
        '$http',
        function (titleService, $state, loginService, $http) {
            //表单对象
            this.loginFormOBJ = {email: "", password: ""};
        
            //更改标题
            titleService.setTitle("登录");

            var self = this;

            //是否显示邮箱错误提示条
            this.showEmailErrTip = false;
            //邮箱错误提示条
            this.emailErrTip = "";

            //检查邮箱
            this.checkEmail = function () {
                this.showEmailErrTip = angular.element(loginForm.email).hasClass("ng-invalid-pattern");
                this.emailErrTip = "邮箱地址不合法";
            };

            //登录
            this.doLogin = function () {
                $http.post("http://127.0.0.1:5000/user/login", this.loginFormOBJ).then(function (data) {
                    if (data.data.result == 1) {
                        alert("登录成功");
                        //命令服务改变登录状态
                        loginService.changeLogin();
                        $state.go('root.home');
                    } else {
                        alert("请检查邮箱或者密码是否错误");
                    }
                });

            }
    }]);
});