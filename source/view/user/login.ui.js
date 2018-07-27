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

page.on("back", function(){ 
	deviceone.print("close page");
	page.hideKeyboard();
	app.closePage({
		"layer": 1,
		animationType:"slide_r2l",
	});
});

ui("lay_goback").on("touch", function () {
	deviceone.print("close page");
	page.hideKeyboard();
    app.closePage({
		"layer": 1,
		animationType:"slide_r2l",
    });
});


function EDULogin(usr, psw){
	if(!usr){
		nf.toast("账号不能为空！");
		return;
	}else if(!psw){
		nf.toast("密码不能为空！");
		return;
	}
	edu.LogIn(usr, psw, function(data) {
		if(data.status >= 400){
			nf.alert("登录失败，请检查手机号和密码是否正确。");
		}else{
			deviceone.print("login");
			data_cache.saveData(con.CK_IS_LOGIN, 1);
			data_cache.saveData(con.CK_EDU_TOKEN, data.access_token);
			data_cache.saveData(con.CK_REFRESH_TOKEN, data.refresh_token);
			data_cache.saveData(con.CK_TOKEN_TYPE, 1);	
			page.hideKeyboard();
			edu.GetUserInfo(function(data) {
				data_cache.saveData(con.CK_USER_NAME, data.username);
				data_cache.saveData(con.CK_USER_PHONE, data.phone);
			})
			//data_cache.saveData(con.CK_USER_NAME, data.username);	
			app.closePage();
		}

	})
}

ui("btn_login").on("touch", function(){
	var username = ui("text_username").text.trim();
	var pwd = ui("text_password").text.trim();
	EDULogin(username, pwd);
});

ui("btn_tosignup").on("touch", function(){
	app.openPage({
		source:"source://view/user/signup.ui",
		statusBarState: "transparent",
		animationType:"slide_r2l"
	})
});

ui("btn_toresetpwd").on("touch", function(){
	app.openPage({
		source:"source://view/user/resetpwd.ui",
		statusBarState: "transparent",
		animationType:"slide_r2l"
	})
});
