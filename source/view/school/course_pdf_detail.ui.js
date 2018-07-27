var app = sm("do_App");
var nf = sm("do_Notification");
var page = sm("do_Page");
var con = require("const");
var edu = require("education");

var data_cache = sm("do_DataCache");
var diag = sm("do_Dialog");
var login_status;
var course_id = page.getData().course_id;
var course_name = page.getData().course_name;
var periodlistdata = mm("do_ListData");
var period_list = ui("period_list");
var user_id;
var page_num = 1;
var nextpageurl = "";
var period_num = 0;
var score_cost = 0;

var totalFee = 0.00;
var course_description = "";
var course_status = 0;    //0:免费未加入   1:免费已加入    2:未付费    3:已付费
var first_lesson = "";
var first_lesson_name = "";

page.on("back", function(){ 
	app.closePage() 
});

ui("lay_goback").on("touch", function () {
    app.closePage();
});

period_list.bindItems(periodlistdata);

ShowCourseDetail();

//显示课程详情
function ShowCourseDetail(){
	edu.CourseDetail(course_id, function(data){	
		deviceone.print("show course detail");
		user_id = data.user_id;
		if(data.cover_url){
			ui("img_cover").source = encodeURI(data.cover_url);
		}else{
			ui("img_cover").source = "source://image/default_course.png"
		}
		
		ui("lab_course_title").text = data.name;
		ui("web_detail").loadString(data.detail);
		score_cost = data.score_exchange;

		if(data.is_free == true){
			ui("lab_course_price").text = "免费";	
			ui("lab_course_price").fontColor = "8ED93CFF";
		}else{
			//ui("lab_course_price").text = "￥" + data.price;		
			ui("lab_course_price").text = data.score_exchange + "积分";
			ui("lab_course_price").fontColor = "D54343FF";
			totalFee = data.price;
		}
		if((data.joined == true) && (data.is_free == true)){
			ui("btn_join_course").visible = false;
			ui("btn_buy_course").visible = false;	
			ui("btn_play_course").visible = true;	
			course_status = 1;
		}else if((data.joined == true) && (data.is_free == false)){
			ui("btn_join_course").visible = false;
			ui("btn_buy_course").visible = false;	
			ui("btn_play_course").visible = true;	
			course_status = 3;
		}else if((data.joined == false) && (data.is_free == false)){
			ui("btn_join_course").visible = false;	
			ui("btn_buy_course").visible = true;
			ui("btn_play_course").visible = false;	
			course_status = 2;
		}else if((data.joined == false) && (data.is_free == true)){
			ui("btn_join_course").visible = true;
			ui("btn_buy_course").visible = false;		
			ui("btn_play_course").visible = false;	
			course_status = 0;
		}
		deviceone.print("course_status = " + course_status);
		ShowCoursePeriod(1);
	});
}

//显示课时列表
function ShowCoursePeriod(page_num){
    edu.CoursePeriodList(page_num, course_id, function(data){    
        deviceone.print("show course period, course_status = " + course_status);  
        if(data.results.length){
        	nextpageurl = data.next;
            var i = 0;
            var pdfurl = "";
            first_lesson = encodeURI(data.results[0].attachment.pdf_url);
            first_lesson_name = data.results[0].title;
            while(data.results[i]){
            	if(data.results[i].attachment.pdf_url){
            		pdfurl = encodeURI(data.results[i].attachment.pdf_url);
            	}
                var period_info = {
                        "course_status": course_status,
                        "course_id": course_id,
                        "pdfurl": pdfurl,
                }
                data.results[i]["period_info"] = period_info;
                i++;
            }
            period_num = period_num + i;
            periodlistdata.addData(data.results);        	
        }else{
        	first_lesson = "";
        }
        period_list.refreshItems();
        if(period_num){
        	ui("lab_no_period").visible = false;
        }else{
        	ui("lab_no_period").visible = true;
        }
    });
}


//下拉到一定位置松手开始刷新数据
period_list.on("pull", function(data) {
    if (data.state == 2) {// 下拉到一定位置松手开始刷新数据
    	periodlistdata.removeAll();
    	period_list.refreshItems();   	
    	period_num = 0;
    	ShowCoursePeriod(1);    
    	period_list.rebound();
    	page_num = 1;
    }
});

//上拉显示下一页数据
period_list.on("push", function(data) {
    if (data.state == 2) {      	
    	if(nextpageurl){
    		page_num++;
    		deviceone.print("add next period page");
    		ShowCoursePeriod(page_num);
    	}else{
			nf.toast("数据已加载完！");
		}
    	period_list.rebound();
    }
});


//加入课程
ui("btn_join_course").on("touch", function(){
	deviceone.print("join class");
	login_status = data_cache.loadData(con.CK_IS_LOGIN);
	if(login_status == 1){
		edu.JoinCourse(course_id, function(data){
			if(data.id){
				nf.toast("加入课程成功");
				periodlistdata.removeAll();
				period_list.refreshItems();
				period_num = 0;
				period_page_num = 1;
			    ShowCourseDetail();
				period_list.rebound();
			}else{
				nf.toast("加入课程失败");
			}
			
		})
	}else{
		app.openPage({
			source: "source://view/user/login.ui",
			data:{"is_goto_course": 1},
			statusBarState : "transparent"
		});
	}
	
});

//购买课程
ui("btn_buy_course").on("touch", function(){
	deviceone.print("join class");
	login_status = data_cache.loadData(con.CK_IS_LOGIN);
	var diagpath = "source://view/school/diag_buywithscore.ui";
	var data = {
			"course_id" : course_id,	
			"score_cost": score_cost,
	};
	
	if(login_status == 1){
		diag.open(diagpath, data, false, function(data, e) {
			
		})
		
	}else{
		app.openPage({
			source: "source://view/user/login.ui",
			statusBarState : "transparent"
		});
	}
	
});

ui("btn_play_course").on("touch", function(){
	deviceone.print("play video");
	login_status = data_cache.loadData(con.CK_IS_LOGIN);
	var payer_name = data_cache.loadData(con.CK_USER_NAME);
	
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
					"pdfurl": first_lesson,
					"pdfname": first_lesson_name
				},
				statusBarState : "transparent"
			});
		}
	}

});


//显示课时列表
ui("btn_show_period").on("touch", function(){
    ui("btn_show_period").fontColor = "D54343FF";
    ui("btn_show_detail").fontColor = "000000FF";
    period_list.visible = true;
    ui("web_detail").visible = false;
    if(period_num){
    	ui("lab_no_period").visible = false;
    }else{
    	ui("lab_no_period").visible = true;
    }
});

//显示课程名称和简介
ui("btn_show_detail").on("touch", function(){
    ui("btn_show_period").fontColor = "000000FF";
    ui("btn_show_detail").fontColor = "D54343FF";
    period_list.visible = false;
    ui("web_detail").visible = true;
    ui("lab_no_period").visible = false;
});

page.on("result", function(data) {   
	periodlistdata.removeAll();
	period_list.refreshItems();   	
	period_num = 0;
	page_num = 1;
	ShowCourseDetail();
	period_list.rebound();	
    ui("btn_show_period").fontColor = "D54343FF";
    ui("btn_show_detail").fontColor = "000000FF";
    period_list.visible = true;
    if(period_num){
    	ui("lab_no_period").visible = false;
    }else{
    	ui("lab_no_period").visible = true;
    }
    ui("web_detail").visible = false;
});


page.on("buycourse", function(data) {   
	periodlistdata.removeAll();
	period_list.refreshItems();   	
	period_num = 0;
	page_num = 1;
	ShowCourseDetail();
	period_list.rebound();	
    ui("btn_show_period").fontColor = "D54343FF";
    ui("btn_show_detail").fontColor = "000000FF";
    period_list.visible = true;
    if(period_num){
    	ui("lab_no_period").visible = false;
    }else{
    	ui("lab_no_period").visible = true;
    }
    ui("web_detail").visible = false;
});

