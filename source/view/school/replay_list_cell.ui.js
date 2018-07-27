var app = sm("do_App");
var nf = sm("do_Notification");
var page = sm("do_Page");
var diag = sm("do_Dialog");
var rootview = ui("$");
var course = require("course");
var con = require("const");
var data_cache = sm("do_DataCache");
var leshi_play = sm("M0078_LePlayerLive");
var login_status = 0;

rootview.setMapping({
	"lab_replay_name.text": "name",
	"lab_replay_name.tag": "id",
	"lay_replay.tag": "replay_info",
	"lab_video_duration.text": "video_duration",
});

//点击课时信息播放乐视点播视频
ui("lay_replay").on("touch", function(){
	var replay_info = JSON.parse(ui("lay_replay").tag);
	deviceone.print("replay_info = " + replay_info);
	var course_status = replay_info.course_status;
	var video_unique = replay_info.video_unique;
	var minor_video_unique = replay_info.minor_video_unique;
	login_status = data_cache.loadData(con.CK_IS_LOGIN);
	var payer_name = data_cache.loadData(con.CK_USER_NAME);
	deviceone.print("login_status = " + login_status);
	deviceone.print("course_status = " + course_status);
	deviceone.print("payer_name = " + payer_name);
	deviceone.print("replay id = " + ui("lab_replay_name").tag);
	deviceone.print("replay time = " + ui("lab_video_duration").text);
	if(login_status != 1){
		app.openPage({
			source: "source://view/me/login.ui",
			data:{"is_goto_course": 1},
			statusBarState : "transparent"
		});
	}else{
		if((course_status == 0)){
			nf.alert("请先加入课程!");
		}else if((course_status == 2)){
			nf.alert("请先购买课程!");
		}else{
			var path = "source://view/school/video_choose.ui";
			var dlogdata = {
				"codetype": 1,
				"video_unique": video_unique,
				"minor_video_unique": minor_video_unique,
				"payer_name": payer_name,
			}
			diag.open(path, dlogdata, true);
/*			if(video_unique){
				deviceone.print("start play video");
				leshi_play.playByID({uuid:con.LESHI_UUID, vuid:video_unique, payerName:payer_name});							
			}else{
				nf.alert("该课时没有视频文件!");
			}*/
		}
	}
});
