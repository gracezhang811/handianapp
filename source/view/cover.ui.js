/**
 * related to cover.ui
 * 
 * @Author : √流浪者
 * @Timestamp : 2017-08-11
 */
var page = sm ("do_Page");
var app = sm ("do_App");
var nf = sm ("do_Notification")
var do_Global = sm ("do_Global");

var con = require("const");
var invoke = require("httpinvoke");
var edu = require("education");
var account = require("account");

var data_cache = sm("do_DataCache");

var timer = mm("do_Timer");

timer.delay= 0;
timer.interval = 3000;
timer.start();


edu.GetNewToken();

page.on("loaded",function(){
	timer.on("tick",function(){
		timer.stop();
			app.openPage({
			source:"source://view/index.ui",
			keyboardMode:"hidden",
			statusBarState:"transparent"
		})
	})
	
})


var timer1 = mm ("do_Timer");
var canback = false;
timer1.delay = 2000;
timer1.interval = 1000;
timer1.on("tick",function(){
	timer1.stop();
	canback = false;
})
page.on("back",function(){
	if(canback){
		do_Global.exit();
	}else {
		timer1.start();
		nf.toast("再次点击退出应用！");
		canback = true;
	}
})