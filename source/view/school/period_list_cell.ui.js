var app = sm("do_App");
var httpinvoke = require("httpinvoke");
var nf = sm("do_Notification");
var page = sm("do_Page");
var rootview = ui("$");
var course = require("course");
var con = require("const");
var data_cache = sm("do_DataCache");
var leshi_play = sm("M0078_LePlayerLive");

var login_status = 0;

rootview.setMapping({
	"lab_period_name.text": "title",
	"lab_period_name.tag": "id",
	"lay_period.tag": "period_info",
	"lab_video_duration.text": "video_duration",
});


//点击课时信息播放乐视点播视频
ui("lay_period").on("touch", function(){
	var period_info = JSON.parse(ui("lay_period").tag);
	var course_status = period_info.course_status;
	var video_unique = period_info.video_unique;
	var period_title = ui("lab_period_name").text;
	login_status = data_cache.loadData(con.CK_IS_LOGIN);
	var payer_name = data_cache.loadData(con.CK_USER_NAME);

	deviceone.print("login_status = " + login_status);
	deviceone.print("course_status = " + course_status);
	deviceone.print("payer_name = " + payer_name);
	deviceone.print("period id = " + ui("lab_period_name").tag);
	deviceone.print("period time = " + ui("lab_video_duration").text);
	if(login_status != 1){
		app.openPage({
			source: "source://view/user/login.ui",
			data:{"is_goto_course": 1},
			statusBarState : "transparent"
		});
	}else{
		if((course_status == 0)){
			nf.alert("请先加入课程!");
		}else if((course_status == 2)){
			nf.alert("请先购买课程!");
		}else{
			if(video_unique){
				deviceone.print("start play video");
				leshi_play.playByID({uuid:con.LESHI_UUID, vuid:video_unique, payerName:payer_name, title:period_title});								
				//leshi_play.playByID(con.LESHI_UUID, video_unique, payer_name);
			}else{
				nf.alert("该课时没有视频文件!");
			}

		}
	}

});
