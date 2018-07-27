var app = sm("do_App");
var httpinvoke = require("httpinvoke");
var nf = sm("do_Notification");
var page = sm("do_Page");
var rootview = ui("$");

rootview.setMapping({
	"img_course.source": "showimage",
	"img_course.tag": "id",
	"lab_course_name.text": "name",
	"lab_course_name.tag": "kind",
	"lab_cource_price.text": "showprice",
	"lab_cource_price.fontColor": "pricecolor",
	"img_islive.visible": "showlive",
});

//点击进入课程详情
ui("lay_course_cell").on("touch", function(){
	deviceone.print("course id = " + ui("img_course").tag);
	var is_live = ui("img_islive").visible;
	var kind = ui("lab_course_name").tag;
	var data = {
			"course_id": ui("img_course").tag,
			"course_name": ui("lab_course_name").text,
			};
	if(is_live== true){
		app.openPage({
			source: "source://view/school/course_live_detail.ui",
			data: data,
			statusBarState : "transparent",
			id:"course_pdf"
		});	
	}else{
		if(kind == "pdf"){
			app.openPage({
				source: "source://view/school/course_pdf_detail.ui",
				data: data,
				statusBarState : "transparent",
				id:"course_pdf"
			});				
		}else if(kind == "video"){
			if(is_live){
				app.openPage({
					source: "source://view/school/course_detail.ui",
					data: data,
					statusBarState : "transparent",
					id:"course_detail"
				});		
			}else{
				app.openPage({
					source: "source://view/school/course_detail.ui",
					data: data,
					statusBarState : "transparent",
					id:"course_detail"
				});		
			}
		}		
	}


});
