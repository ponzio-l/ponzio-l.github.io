require.config({
    baseUrl: '/',
    //别名
    paths: {
        'angular': 'assets/angular/angular.min',
        'angular-ui-router': 'assets/angular-ui-router/release/angular-ui-router.min',
        'angular-async-loader': 'assets/angular-async-loader/dist/angular-async-loader.min',
        'jquery': 'assets/jquery/dist/jquery.min',
        'jquery-ui': 'assets/jquery-ui/jquery-ui.min',
        'bootstrap': 'assets/bootstrap/js/bootstrap.min',
        "angular-file-upload": 'assets/angular-file-upload/dist/angular-file-upload.min'
    },
    //声明paths中元素暴露的接口和依赖
    shim: {
        'angular': {exports: 'angular'},  //暴露的是angular
        'angular-ui-router': { deps: ['angular'] },  //依赖的是angular
        'jquery': {exports: 'jquery'},  //暴露的是jquery
        'jquery-ui': { deps: ['jquery'] },  //依赖的是jquery
        'angular-file-upload': { deps: ['angular'] }  //依赖的是angular
    }
});
//核心入口
require(['angular', './app-routes'], function (angular) {
    //当整个文档就绪之后
    angular.element(document).ready(function () {
        //angular.bootstrap是一个方法，表示启动angular
        angular.bootstrap(document, ['app']);
        //通过类名添加ng-app指令，也可以通过attr来添加
        angular.element(document).find('html').addClass('ng-app');
    });
});