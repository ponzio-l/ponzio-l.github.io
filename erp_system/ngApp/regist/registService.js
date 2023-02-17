define(function (require) {
    var app = require("app");
    app.factory("registService", ["$http", function ($http) {
        //检查邮箱是否被占用
        function checkEmailExist(email, callback) {
            $http.post("http://127.0.0.1:5000/user/checkExist", { "email": email }).then(callback);
        }
        //发送验证码
        function sendIdentifyingCode(email, callback) {
            $http.post("http://127.0.0.1:5000/user/sendIdentifyingCode", { "email": email }).then(callback);
        }
        //执行注册
        function doRegist(username, email, password, callback) {
            $http.post("http://127.0.0.1:5000/user/regist", { "username": username, "email": email, "password":password, "avatar":"/images/default_avatar.png"}).then(callback);
        }
        return {
            "checkEmailExist": checkEmailExist,
            "sendIdentifyingCode": sendIdentifyingCode,
            "doRegist": doRegist
        }
    }]);
});