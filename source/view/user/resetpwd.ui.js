/**
 * related to login.ui
 * 
 * @Author : zhangll_927@163.com
 * @Timestamp : 2017-08-21
 */
var app = sm("do_App");
var nf = sm("do_Notification");
var page = sm("do_Page");
var con = require("const");
var edu = require("education");

var data_cache = sm("do_DataCache");
var login_status;
var btn_sendcode = ui("btn_sendcode");

var timer = mm("do_Timer");
timer.delay= 60000;
timer.interval = 60000;

page.on("back", function(){ 
	app.closePage() 
});

ui("lay_goback").on("touch", function () {
    app.closePage();
});


function EDUResetPwd(phone,code, psw, repsw){
	if(!phone){
		nf.toast("手机号不能为空！");
		return;
	}
	else if(!code){
		nf.toast("验证码不能为空！");
		return;
	}
	else if(!psw){
		nf.toast("密码不能为空！");
		return;
	}
	else if(!repsw){
		nf.toast("确认密码不能为空！");
		return;
	}
	else if(psw != repsw){
		nf.toast("二次密码输入不一致！");
		return;
	}
	
	var para = {
			"phone":phone,
			"password": psw,	
			"captcha": code,
	}
	edu.ResetPwd(para, function(data) {
		if(data.status >= 400){
			var msg = JSON.parse(data.data);
			nf.toast(msg.error);
		}else{
			deviceone.print("resetpwd");
			nf.toast("重置密码成功！");
			app.closePage();
		}
	})
}

ui("btn_resetpwd").on("touch", function(){
	var code = ui("text_code").text.trim();
	var phonenum = ui("text_phone").text.trim();
	var pwd1 = ui("text_password").text.trim();
	var pwd2 = ui("text_repwd").text.trim();
	EDUResetPwd(phonenum, code, pwd1, pwd2);
});


btn_sendcode.on("touch", function(){
	var phonenum = ui("text_phone").text.trim();
	var para = {
			"phone":phonenum,
	}
	if(phonenum == ""){
		nf.toast("手机号不能为空！");
	}else{
		edu.SendPhone(para, function(data) {
			if(data.status >= 400){
				var msg = JSON.parse(data.data);
				nf.toast(msg.error);
			}else{
				deviceone.print("send code");
				timer.start();
				btn_sendcode.text = "60s后再次获取";
				btn_sendcode.enabled = false;
				btn_sendcode.bgColor = "C0C0C0FF";
			}
		})		
	}
});

timer.on("tick",function(){
	timer.stop();
	btn_sendcode.text = "发送验证码";
	btn_sendcode.enabled = true;
	btn_sendcode.bgColor = "2B8CFFFF";
})