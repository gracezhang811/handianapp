/**
 * related to recv_templates.ui
 * 
 * @Author : √流浪者
 * @Timestamp : 2017-07-21
 */
var app = sm("do_App");
var page = sm("do_Page");
var global = sm("do_Global");
var nf = sm ("do_Notification");

var root = ui ("$");
var do_Image_recv = ui ("do_Image_recv");
var do_RichLabel_recv = ui ("do_RichLabel_recv");

root.setMapping({
	"do_RichLabel_recv.text":"recvMsg",
	"do_RichLabel_recv.tag":"recvMsg"
});

do_RichLabel_recv.on("linkTouch",function(data){	
	var re_json = JSON.stringify(data);
	deviceone.print("link data: " + re_json);
	var re_data = JSON.parse(re_json);
	var raw_url = re_data.href;
	var url = raw_url.substring(1);
	deviceone.print("link url: " + url);
	global.setMemory("openURL",url);
	app.openPage({
		source:"source://view/problem/webviewer.ui",
		statusBarState:"transparent",
		animationType:"fade"
	});
});