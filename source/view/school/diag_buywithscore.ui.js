/**
 * related to diag_buywithscore.ui
 * 
 * @Author : zhangll_927@163.com
 * @Timestamp : 2017-08-25
 */
var app = sm("do_App");
var nf = sm("do_Notification");
var diag = sm("do_Dialog");
var page = sm("do_Page");
var con = require("const");
var edu = require("education");

var data_cache = sm("do_DataCache");
var login_status;
var course_id = diag.getData().course_id;
var score_cost = diag.getData().score_cost;

edu.GetUserInfo(function(data){
	ui("lab_userscore").text = data.scores;
	ui("lab_coursescore").text = score_cost;
});

ui("btn_cancel").on("touch", function(){
	diag.close();
})

ui("btn_buy").on("touch", function(){
	edu.BuyCourseByScore(course_id, function(data) {
		if(data.status >= 400){
			nf.toast("购买课程失败。");
		}else{
			nf.toast("购买课程成功。");
		}
		page.fire("buycourse");
		diag.close();
	})
})