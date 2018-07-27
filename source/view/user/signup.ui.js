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
var btn_nosend = ui("btn_nosend");
var timer1 = mm("do_Timer");
timer1.delay= 60000;
timer1.interval = 60000;

page.on("back", function(){ 
	page.hideKeyboard();
	app.closePage() 
});

ui("lay_goback").on("touch", function () {
	page.hideKeyboard();
    app.closePage();
});


btn_sendcode.on("touch", function(){
	var phonenum = ui("text_phone").text.trim();
	var para = {
			"phone":phonenum,
	}
	if(phonenum == ""){
		nf.toast("手机号不能为空！");
	}else{
		edu.SendPhoneForReg(para, function(data) {
			if(data.status >= 400){
				//nf.toast("发送验证码失败，请检查网络情况。");
				var msg = JSON.parse(data.data);
				nf.toast(msg.error);
			}else{
				deviceone.print("--------send code");				
				btn_nosend.visible = true;
				btn_sendcode.visible = false;
				timer1.start();
			}
		})		
	}
});

timer1.on("tick",function(){
	timer1.stop();
	btn_nosend.visible = false;
	btn_sendcode.visible = true;
})

function EDUSignUp(phone,code, psw, repsw){
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
			"username": phone,
			"phone":phone,
			"password": psw,	
			"captcha": code,
	}
	edu.SignUpNew(para, function(data) {
		if(data.status >= 400){
			//nf.toast("注册失败，请检查网络情况。");
			var msg = JSON.parse(data.data);
			nf.toast(msg);
		}else{
			deviceone.print("signup");
			nf.toast("注册成功！");
			app.closePage();
		}
	})
}

ui("btn_signup").on("touch", function(){
	var phonenum = ui("text_phone").text.trim();
	var pwd1 = ui("text_password").text.trim();
	var pwd2 = ui("text_repwd").text.trim();
	var code = ui("text_code").text.trim();
	EDUSignUp(phonenum,code, pwd1, pwd2);
});

ui("lay_main").on("touch", function(){
	page.hideKeyboard();
})