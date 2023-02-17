define(function (require) {
    var app = require("app");
    
    app.factory('loginService', ["$http", function ($http) {
        var isLogin = false;
        var name = "";
        var email = "";

        return {
            changeLogin: function () {
                $http.get("http://127.0.0.1:5000/user/checkLogin").then(function (data) {
                    isLogin = data.data.login;
                    name = data.data.name;
                    email = data.data.email;
                });
            },
            getLogin: function () {
                return isLogin;
            },
            getName: function () {
                return name;
            },
            getEmail: function () {
                return email;
            },
            logout: function (email) {
                return $http.post("http://127.0.0.1:5000/user/logout", { "email": email });
            }
        }
    }]);
});