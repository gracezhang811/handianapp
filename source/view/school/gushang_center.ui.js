/**
 * related to cme_school.ui
 * 
 * @Author : √流浪者
 * @Timestamp : 2017-07-31
 */
var page = sm ("do_Page");
var app = sm ("do_App");
var UM = sm("do_UMengAnalytics");
var nf = sm ("do_Notification");
var data_cache = sm("do_DataCache");
var edu = require("education")

var courselistdata = mm("do_ListData");
var grid_course = ui("grid_course");

grid_course.bindItems(courselistdata);
var category_id = 3;

var do_back = ui("do_back")
do_back.on("touch",function(){
	app.closePage();
})
page.on("back",function(){
	app.closePage();
})
page.on("resume", function(data, e) {
	UM.beginPageLog({pageName:"page_gushang"});
	deviceone.print("--umeng + page_gushang" );
});


ShowCourseFirstList(category_id);

function ShowCourseFirstList(category_id){
	edu.CourseList(category_id, function(data){			
		if(data.results){
			RebuildCourseData(data.results);
			courselistdata.addData(data.results);			
		}
		grid_course.refreshItems();
	});
}


function RebuildCourseData(data){
	var i = 0;
	while(data[i]){
		if(data[i].is_free == true){
			data[i]["showprice"] = "免费";
			data[i]["pricecolor"] = "8ED93CFF";
		}else{
			//data[i]["showprice"] = "￥"+data[i].price;
			data[i]["showprice"] = data[i].score_exchange + "积分";
			data[i]["pricecolor"] = "D54343FF";
		}
		if(data[i].small_cover_url){
			data[i]["showimage"] = encodeURI(data[i].small_cover_url);
		}else{
			data[i]["showimage"] = "source://image/default_course.png";
		}
		if(data[i].live == true){
			data[i]["showlive"] = true;
		}else{
			data[i]["showlive"] = false;
		}		
		i++;
	}
}

ui("btn_more_cme").on("touch",function(){
	app.openPage({
		source: "source://view/school/course_list.ui",
		data: {
			"category_id": 3,
			"category_name": "骨伤中心课程列表"
		},
		statusBarState : "transparent",
	});		
});