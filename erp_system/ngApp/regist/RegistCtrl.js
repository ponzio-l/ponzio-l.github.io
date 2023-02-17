define(function (require) {
    var app = require("app");
    require("./registService");
    require("../ngServices/passwordStrengthService");
    require("../ngDirectives/passwordStrengthBar");
    app.controller("RegistCtrl", [
        'registService',
        'titleService',
        'passwordStrengthService',
        '$state',
        function (registService, titleService, passwordStrengthService, $state) {
            var self = this;
            //表单对象
            this.registFormOBJ = {username:"", email: "", password: "", password2: "", identifyingCode:""};
        
            //更改标题
            titleService.setTitle("注册");

            //是否显示邮箱错误提示条
            this.showEmailErrTip = false;
            //邮箱错误提示条
            this.emailErrTip = "";
            //邮箱提示条的类型，alert-danger、alert-success
            this.emailTipType = "";
            //是否可以发送验证码
            this.cannotSend = true;
            //是否显示验证码提示条
            this.showIdentifyingCodeUnsameTip = false;
            //验证码提示条
            this.identifyingCodeTip = "";
            //验证码提示条类型
            this.identifyingCodeType = "";
            //接收到的验证码
            this.receiveIdentifyingCode = "";
            //是否显示密码强度提示条
            this.showPasswordStrengthTip = false;

            //检查邮箱，这个函数在邮箱输入框被blur时触发
            this.checkEmail = function () {
                if (this.registFormOBJ.email == "") {
                    return;
                }
                //检查是否通过正则
                if (this.showEmailErrTip = angular.element(registForm.email).hasClass("ng-invalid-pattern")) {
                    this.showEmailErrTip = true;
                    this.emailTipType = "alert-danger";
                    this.emailErrTip = "邮箱地址不合法";
                    return;
                }
                //命令服务，检查邮箱的占用情况
                registService.checkEmailExist(this.registFormOBJ.email, function (data) {
                    var canUse = data.data.result;
                    if (canUse == 1) {
                        self.showEmailErrTip = true;
                        self.emailTipType = "alert-success";
                        self.emailErrTip = "恭喜，可以使用！";
                        self.cannotSend = false;
                    } else if(canUse == -1) {
                        self.showEmailErrTip = true;
                        self.emailTipType = "alert-danger";
                        self.emailErrTip = "已经被占用！";
                        self.cannotSend = true;
                    } else {
                        self.cannotSend = true;
                    }
                });
            };

            //通过服务检查密码强度
            this.getStrength = function () {
                this.passwordStrength = passwordStrengthService.caclStrength(this.registFormOBJ.password);
                return this.passwordStrength;
            };

            //检查密码强度是否达标
            this.checkPasswordStrength = function () {
                this.showPasswordStrengthTip = this.getStrength() < 3;
            };

            //检查两次密码是否一致
            this.checkPasswordSame = function () {
                if (this.registFormOBJ.password != "" && this.registFormOBJ.password2 != "") {
                    if (this.registFormOBJ.password != this.registFormOBJ.password2) {
                        this.showPasswordUnsameTip = true;

                    } else {
                        this.showPasswordUnsameTip = false;

                    }
                }
            };

            //发送验证码
            this.sendIdentifyingCode = function () {
                registService.sendIdentifyingCode(this.registFormOBJ.email, function (data) {
                    self.receiveIdentifyingCode = data.data.identifyingCode;
                    alert("验证码已发送");
                });
            }

            //检查验证码是否通过
            this.checkIdentifyingCodeSame = function () {
                if (this.registFormOBJ.identifyingCode != "" && this.receiveIdentifyingCode != "") {
                    if (this.registFormOBJ.identifyingCode == this.receiveIdentifyingCode) {
                        this.showIdentifyingCodeUnsameTip = true;
                        this.identifyingCodeType = "alert-success";
                        this.identifyingCodeTip = "验证成功";
                    } else {
                        this.showIdentifyingCodeUnsameTip = false;
                        this.identifyingCodeType = "alert-danger";
                        this.identifyingCodeTip = "验证失败";
                    }
                }
            };

            //注册
            this.doRegist = function () {
                registService.doRegist(this.registFormOBJ.username, this.registFormOBJ.email, this.registFormOBJ.password, function (data) {
                    if (data.data.result == 1) {
                        alert("注册成功");
                        $state.go('root.login');
                    } else {
                        alert("注册失败");
                    }
                });
            }
    }]);
});