define(function (require) {
    var app = require('app');
    
    require('jquery'); 

    app.directive("passwordStrengthBar", [function () {
        //返回一个指令定义对象
        return {
            //scope表示从属性中读取值
            scope: {
                "strength": "@"
            },
            //E级别指令，就是元素级别的指令
            restrict: "E",
            templateUrl: "ngApp/ngDirectives/passwordStrengthBar.html",
            link: function ($scope, ele) {
                var arrowWidth = $(ele).find("b.arrow").width();
                var barWidth = $(ele).width() / 5;

                $scope.getPosition = function () {
                    return {
                        "left": barWidth * $scope.strength + (barWidth - arrowWidth) / 2 + "100px"
                        
                    };
                };
            }
        }
    }]);
});