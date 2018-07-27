var app = sm("do_App");
var httpinvoke = require("httpinvoke");
var nf = sm("do_Notification");
var page = sm("do_Page");
var rootview = ui("$");
var course = require("course");
var con = require("const");
var data_cache = sm("do_DataCache");
var leshi_play = sm("M0078_LePlayerLive");
var diag = sm("do_Dialog");
var login_status = 0;

rootview.setMapping({
	"lab_live_name.text": "live_name",
	"lab_live_name.tag": "id",
	"lay_live.tag": "live_info",
	"lab_live_status.text": "live_status",
	"lab_live_status.tag": "status",
	"lab_live_status.bgColor": "status_color",
});


//点击课时信息播放乐视点播视频
ui("lay_live").on("touch", function(){
	var live_info = JSON.parse(ui("lay_live").tag);
	var course_status = live_info.course_status;
	var minor_activity_id = live_info.minor_activity_id;
	var activity_id = live_info.activity_id;
	var live_status = ui("lab_live_status").tag;
	login_status = data_cache.loadData(con.CK_IS_LOGIN);
	var payer_name = data_cache.loadData(con.CK_USER_NAME);
	
	deviceone.print("login_status = " + login_status);
	deviceone.print("course_status = " + course_status);
	deviceone.print("live id = " + ui("lab_live_name").tag);
	
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
			if(live_status == "staging"){
				nf.alert("该直播课时没有开始!");
			}else if(live_status == "started"){
				nf.alert("该直播课时正在准备中，请稍候!");
			}else if(live_status == "finished"){
				nf.alert("该直播课时已结束！");
			}else if(live_status == "running"){
				var path = "source://view/school/video_choose.ui";
				var dlogdata = {
					"codetype": 0,
					"minor_activity_id": minor_activity_id,
					"activity_id": activity_id,
				}
				diag.open(path, dlogdata, true);
				
			}
			

		}
	}

});
