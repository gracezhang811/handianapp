var app = sm("do_App");
var httpinvoke = require("httpinvoke");
var nf = sm("do_Notification");
var page = sm("do_Page");
var rootview = ui("$");

rootview.setMapping({
	"img_course.source": "showimage",
	"img_course.tag": "course_id",
	"lab_course_name.text": "course.name",
	"lab_cource_status.text": "learn_status",
//	"lab_cource_price.fontColor": "pricecolor",
	"img_islive.visible": "showlive",
});

//点击进入课程详情
ui("lay_course_cell").on("touch", function(){
	deviceone.print("image source = " + ui("img_course").source);
	deviceone.print("course id = " + ui("img_course").tag);
	var is_live = ui("img_islive").visible;
	var data = {
			"course_id": ui("img_course").tag,
			"course_name": ui("lab_course_name").text,
			};
	if(is_live){
		app.openPage({
			source: "source://view/school/course_detail.ui",
			data: data,
			statusBarState : "transparent",
			id:"course_live_detail"
		});		
	}else{
		app.openPage({
			source: "source://view/school/course_detail.ui",
			data: data,
			statusBarState : "transparent",
			id:"course_detail"
		});		
	}
});

//点击进入课程详情
ui("img_course").on("touch", function(){
	deviceone.print("image source = " + ui("img_course").source);
	deviceone.print("course id = " + ui("img_course").tag);
	var is_live = ui("img_islive").visible;
	var data = {
			"course_id": ui("img_course").tag,
			"course_name": ui("lab_course_name").text,
			};
	if(is_live){
		app.openPage({
			source: "source://view/school/course_live_detail.ui",
			data: data,
			statusBarState : "transparent",
			id:"course_live_detail"
		});		
	}else{
		app.openPage({
			source: "source://view/school/course_detail.ui",
			data: data,
			statusBarState : "transparent",
			id:"course_detail"
		});		
	}
});