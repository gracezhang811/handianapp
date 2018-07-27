var app = sm("do_App");
var httpinvoke = require("httpinvoke");
var nf = sm("do_Notification");
var page = sm("do_Page");
var rootview = ui("$");
var course = require("course");
var con = require("const");
var data_cache = sm("do_DataCache");

var login_status = 0;

rootview.setMapping({
	"lab_period_name.text": "title",
	"lab_period_name.tag": "id",
	"lay_period.tag": "period_info",
});

ui("lay_period").on("touch", function(){
	var period_info = JSON.parse(ui("lay_period").tag);
	var course_status = period_info.course_status;
	var pdfurl = period_info.pdfurl;
	var period_title = ui("lab_period_name").text;
	login_status = data_cache.loadData(con.CK_IS_LOGIN);

	deviceone.print("login_status = " + login_status);
	deviceone.print("course_status = " + course_status);
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
			app.openPage({
				source: "source://view/school/pdfread.ui",
				data:{
					"pdfurl": pdfurl,
					"pdfname": period_title
				},
				statusBarState : "transparent"
			});

		}
	}

});
