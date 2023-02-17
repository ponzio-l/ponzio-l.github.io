define(function (require) {
    var app = require('app');
    require("jquery");
    require("../ngServices/loginService");
    app.controller('ProfileCtrl', ['titleService',
                    "$http",
                    "FileUploader",
                    "loginService",
                    function (titleService, $http, FileUploader, loginService) {
        //更改标题
        titleService.setTitle("个人资料修改");
        //选项卡信号量
        this.idx = 0;  //0、1

        this.changeTab = function (number) {
            this.idx = number;
        }

        var self = this;
        $http.get("http://127.0.0.1:5000/user/profile").then(function (data) {
            self.formOBJ = data.data; 
        });
        //配置file上传控件
        this.uploader = new FileUploader({
            url: 'http://127.0.0.1:5000/user/upload',
            autoUpload: true,
            queueLimit: 1,
            filters: [{
                fn: function (item) {
                    if(item.type.indexOf("jpg") != -1 ||
                        item.type.indexOf("png") != -1 ||
                        item.type.indexOf("gif") != -1 ||
                        item.type.indexOf("jpeg") != -1 ||
                        item.type.indexOf("bmp") != -1) {
                        return true;
                    }
                    return false;
                }
            }],
            //添加完毕上传的文件后要做的事情
            onAfterAddingFile: function (item) {
                if (item.size > 200 * 1024) {
                    alert("请选择200kb以内的图片");
                    self.uploader.clearQueue();
                    $("#file").val("");
                    return;
                }
            },
            //当添加文件失败的时候
            onWhenAddingFileFailed: function () {
                alert("请上传正确的文件类型！");
                self.uploader.clearQueue();
                $("#file").val("");
                return;
            },
            //当上传所有文件完毕的时候
            onCompleteAll: function () {
                alert("上传成功！");
                self.uploader.clearQueue();
                // $("#file").val("");
            }
        });
        this.isLogin = function () {
            return loginService.getLogin();
        }
    }]);
});
  