define(function (require) {
    //引入app对象
    var app = require('./app');
    //定义路由
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('root', {
                templateUrl: 'ngApp/root/root.html',
                // new attribute for ajax load controller
                controllerUrl: 'ngApp/root/RootCtrl',
                controller: 'RootCtrl as rootCtrl'
            })
        .state('root.home', {
            'url': '/home',
            templateUrl: 'ngApp/home/home.html',
            // new attribute for ajax load controller
            controllerUrl: 'ngApp/home/HomeCtrl',
            controller: 'HomeCtrl as homeCtrl'
        })
        .state('root.regist', {
            'url': '/regist',
            templateUrl: 'ngApp/regist/regist.html',
            // new attribute for ajax load controller
            controllerUrl: 'ngApp/regist/RegistCtrl',
            controller: 'RegistCtrl as registCtrl'
        })
        .state('root.login', {
            'url': '/login',
            templateUrl: 'ngApp/login/login.html',
            // new attribute for ajax load controller
            controllerUrl: 'ngApp/login/LoginCtrl',
            controller: 'LoginCtrl as loginCtrl'
        })
        .state('root.profile', {
            'url': '/profile',
            templateUrl: 'ngApp/profile/profile.html',
            // new attribute for ajax load controller
            controllerUrl: 'ngApp/profile/ProfileCtrl',
            controller: 'ProfileCtrl as profileCtrl'
            });
    }]);
    //定义一个最大的控制器，目的是控制页面的title
    app.controller("MainCtrl", ["titleService", function (titleService) {
        this.getTitle = function () {
            return titleService.getTitle();
        };
    }]);
    
    //全局服务，页面标题的文字
    app.factory("titleService", function () {
        var title = "";
        return {
            getTitle: function () {
                return title;
            },
            setTitle: function (str) {
                title = str;
            }
        }
    });
});