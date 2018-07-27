/**
 * related to webviewer.ui
 * 
 * @Author : rivertoday@163.com
 * @Timestamp : 2017-07-13
 */
var app = sm("do_App");
var page = sm("do_Page");
var nf = sm("do_Notification");
var global = sm("do_Global");
var do_ALayout_back = ui("do_ALayout_back");
var web_show = ui("web_show");

page.on("back", function(){
	app.closePage();
});

do_ALayout_back.on("touch", function() {
	app.closePage();
});

page.on("loaded", function(){
	var url = global.getMemory("openURL");
	deviceone.print("open url: " + url);
	web_show.url = url;	
});
