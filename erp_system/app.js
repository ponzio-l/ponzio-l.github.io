define(function (require, exports, module) {
    //这是一个CMD规范的模块，模块的作用是向外暴露app整体
    //AMD只能向外暴露json形式的API

    //引入依赖
    var angular = require('angular');
    var asyncLoader = require('angular-async-loader');

    require('angular-ui-router');
    require('angular-file-upload');

    //创建app对象，app对象依赖ui.router
    var app = angular.module('app', ['ui.router', 'angularFileUpload']);

    // initialze app module for angular-async-loader
    asyncLoader.configure(app);
    //向外暴露
    module.exports = app;
});