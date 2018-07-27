var app = sm("do_App");
var nf = sm("do_Notification");
var page = sm("do_Page");
var con = require("const");
var edu = require("education");
var httpinvoke = require("httpinvoke");	
var leshi_play = sm("M0078_LePlayerLive");
//var we = sm("do_TencentWX");
//var global = sm("do_Global");
var data_cache = sm("do_DataCache");
var login_status;
var course_id = page.getData().course_id;
var course_name = page.getData().course_name;
var periodlistdata = mm("do_ListData");
var period_list = ui("period_list");
var livelistdata = mm("do_ListData");
var live_list = ui("live_list");
var replay_list = ui("replay_list");
var replaylistdata = mm("do_ListData");
var user_id;
var period_page_num = 1;
var live_page_num = 1;
var replay_page_num = 1;
var period_num = 0;
var live_num = 0;
var replay_num = 0;
var nextperiodpageurl = "";
var nextlivepageurl = "";
var nextreplaypageurl = "";
//var login_user_id = data_cache.loadData(con.CK_USER_ID);
var totalFee = 0.00;
var course_description = "";
var course_status = 0;    //0:免费未加入   1:免费已加入    2:未付费    3:已付费
var course_plan = "";
var first_lesson = "";
var first_lesson_name = "";
var firstshow = 1;

page.on("back", function(){ 
	app.closePage() 
});

ui("lay_goback").on("touch", function () {
    app.closePage();
});

period_list.bindItems(periodlistdata);
live_list.bindItems(livelistdata);
replay_list.bindItems(replaylistdata);

ShowCourseDetail();

//显示课程详情
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

		if(data.joined == true){
			ui("btn_join_course").visible = false;
			ui("btn_play_course").visible = true;
			course_status = 1;
		}else{
			ui("btn_join_course").visible = true;
			ui("btn_play_course").visible = false;
			course_status = 0;
		}
	if(data.is_free == true){
			ui("lab_course_price").text = "免费";	
			ui("lab_course_price").fontColor = "8ED93CFF";
		}else{
			//ui("lab_course_price").text = "￥" + data.price;		
			ui("lab_course_price").text = data.score_exchange + "积分";
			ui("lab_course_price").fontColor = "D54343FF";
			totalFee = data.price;
		}
		deviceone.print("course_status = " + course_status);
		ShowCoursePeriod(1);
	});
}


function ShowCourseInfo(){
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

		if(data.joined == true){
			ui("btn_join_course").visible = false;
			ui("btn_play_course").visible = true;
			course_status = 1;
		}else{
			ui("btn_join_course").visible = true;
			ui("btn_play_course").visible = false;
			course_status = 0;
		}
	if(data.is_free == true){
			ui("lab_course_price").text = "免费";	
			ui("lab_course_price").fontColor = "8ED93CFF";
		}else{
			ui("lab_course_price").text = "￥" + data.price;		
			ui("lab_course_price").fontColor = "D54343FF";
			totalFee = data.price;
		}
		deviceone.print("course_status = " + course_status);
	});
}


//显示课时列表
function ShowCoursePeriod(period_page_num){
    edu.CoursePeriodList(period_page_num, course_id, function(data){ 
        deviceone.print("show course period, course_status = " + course_status);    
        if(data.results){
        	nextperiodpageurl = data.next;
            var i = 0;
            var video_unique = "";
            first_lesson = data.results[i].video_unique;
            first_lesson_name = data.results[i].title;
            while(data.results[i]){
            	video_unique = data.results[i].video_unique;
                var period_info = {
                        "course_status": course_status,
                        "course_id": course_id,
                        "video_unique": video_unique,
                }
                data.results[i]["period_info"] = period_info;
                i++;
            }
            period_num = period_num + i;
            periodlistdata.addData(data.results);        	
        }
        period_list.refreshItems();
        if(period_num){
        	ui("lab_no_period").visible = false;
        }else{
        	ui("lab_no_period").visible = true;
        }
    });
}

function ShowCourseLiveLesson(page_num){
    edu.CourseLiveList(course_id,page_num,function(data){    
        deviceone.print("show course live lesson, course_status = " + course_status);    
        if(data.results){
        	nextlivepageurl = data.next;
            var i = 0;
            var minor_activity_id = "";
            var start_time = "";
            while(data.results[i]){
            	minor_activity_id = data.results[i].minor_activity_id;
                var live_info = {
                        "course_status": course_status,
                        "course_id": course_id,
                        "minor_activity_id": minor_activity_id,
                        "activity_id": data.results[i].activity_id,
                }
                start_time = httpinvoke.DateFormat(data.results[i].start_time);
               // deviceone.print("---------" + start_time);
                if(data.results[i].status == "staging"){
                	data.results[i]["live_status"] = "未开始";
                	data.results[i]["status_color"] = "A0B2BBFF";
                	data.results[i]["live_name"] = start_time + " " + data.results[i].name;
                }else if(data.results[i].status == "started"){
                	data.results[i]["live_status"] = "准备中";
                	data.results[i]["status_color"] = "F89C05FF";
                	data.results[i]["live_name"] = data.results[i].name;
                }else if(data.results[i].status == "running"){
                	data.results[i]["live_status"] = "进行中";
                	data.results[i]["status_color"] = "D54343FF";
                	data.results[i]["live_name"] = data.results[i].name;
                }else{
                	data.results[i]["live_status"] = "已结束";
                	data.results[i]["status_color"] = "36C000FF";
                	data.results[i]["live_name"] = data.results[i].name;
                }
                data.results[i]["live_info"] = live_info;
                
                i++;
            }
            livelistdata.addData(data.results);      
            live_num = live_num + i;
        }
        live_list.refreshItems();
        if(live_num){
        	ui("lab_no_period").visible = false;
        }else{
        	ui("lab_no_period").visible = true;
        }
    });
}

/*
function ShowCourseReplayLesson(){
    course.GetCourseLiveReplay(course_id, function(data){    
        deviceone.print("show course live reply lesson, course_status = " + course_status);    
        if(data.results){
        	nextreplaypageurl = data.next;
            var i = 0;
            while(data.results[i]){
            	var attachment = data.results[i].attachment;
                var replay_info = {
                        "course_status": course_status,
                        "course_id": course_id,
                        "minor_video_unique": data.results[i].minor_video_unique,
                        "video_unique": attachment.video_unique,
                }
                data.results[i]["replay_info"] = replay_info;
                data.results[i]["video_duration"] = httpinvoke.DurationFormat(data.results[i].minor_video_seconds);
                i++;
            }
            replaylistdata.addData(data.results);   
            replay_num = replay_num + i;
        }
        replay_list.refreshItems();
        if(replay_num){
        	ui("lab_no_period").visible = false;
        }else{
        	ui("lab_no_period").visible = true;
        }
    });
}
*/
//下拉到一定位置松手开始刷新数据
period_list.on("pull", function(data) {
    if (data.state == 2) {// 下拉到一定位置松手开始刷新数据
    	periodlistdata.removeAll();
    	period_list.refreshItems();
    	period_num = 0;
    	ShowCoursePeriod(1);    
    	period_list.rebound();
    	period_page_num = 1;
    }
});

//上拉显示下一页数据
period_list.on("push", function(data) {
    if (data.state == 2) {      	
    	if(nextperiodpageurl){
    		period_page_num++;
    		deviceone.print("add next period page");
    		ShowCoursePeriod(period_page_num);
    	}else{
			nf.toast("数据已加载完！");
		}
    	period_list.rebound();
    }
});


//下拉到一定位置松手开始刷新数据
live_list.on("pull", function(data) {
    if (data.state == 2) {// 下拉到一定位置松手开始刷新数据
    	livelistdata.removeAll();
    	live_list.refreshItems();
    	live_num = 0;
    	ShowCourseLiveLesson(1);    
    	live_list.rebound();
    	live_page_num = 1;
    }
});

//上拉显示下一页数据
live_list.on("push", function(data) {
    if (data.state == 2) {      	
    	if(nextlivepageurl){
    		live_page_num++;
    		deviceone.print("add next live page");
    		ShowCourseLiveLesson(live_page_num);
    	}else{
			nf.toast("数据已加载完！");
		}
    	live_list.rebound();
    }
});

/*
//下拉到一定位置松手开始刷新数据
replay_list.on("pull", function(data) {
    if (data.state == 2) {// 下拉到一定位置松手开始刷新数据
    	replaylistdata.removeAll();
    	replay_list.refreshItems();
    	replay_num = 0;
    	ShowCourseReplayLesson();    
    	replay_list.rebound();
    	replay_page_num = 1;
    }
});

//上拉显示下一页数据
replay_list.on("push", function(data) {
    if (data.state == 2) {      	
    	if(nextreplaypageurl){
    		replay_page_num++;
    		deviceone.print("add next replay page");
    		//ShowCourseReplayLesson();
    	}else{
			nf.toast("数据已加载完！");
		}
    	replay_list.rebound();
    }
});
*/

//加入课程
ui("btn_join_course").on("touch", function(){
	login_status = data_cache.loadData(con.CK_IS_LOGIN);
	deviceone.print("join class");
	if(login_status == 1){
		edu.JoinCourse(course_id, function(data){
			if(data.id){
				nf.toast("加入课程成功");			    
			    ShowCourseInfo();
		    	periodlistdata.removeAll();
		    	period_list.refreshItems();
		    	period_num = 0;
		    	ShowCoursePeriod(1);    
		    	period_list.rebound();
		    	period_page_num = 1; 		    	
				
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
		}else{
			if(first_lesson){
				leshi_play.playByID({uuid:con.LESHI_UUID, vuid:first_lesson, payerName:payer_name, title:first_lesson_name});								
				//leshi_play.playByID(con.LESHI_UUID, video_unique, payer_name);
			}else{
				nf.alert("该课程没有视频课时!");
			}

		}
	}

});

ui("img_play").on("touch", function(){
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
		}else{
			if(first_lesson){
				leshi_play.playByID({uuid:con.LESHI_UUID, vuid:first_lesson, payerName:payer_name, title:first_lesson_name});								
				//leshi_play.playByID(con.LESHI_UUID, video_unique, payer_name);
			}else{
				nf.alert("该课程没有视频课时!");
			}

		}
	}

});

/*
//购买课程
ui("btn_buy_course").on("touch", function(){
	login_status = data_cache.loadData(con.CK_IS_LOGIN);
    if(login_status == 1){
        var data = {
                "totalFee": totalFee,
        };
        //调生成订单的接口
        course.GetOrderCourse(course_id,totalFee,user_id,function(data){
            deviceone.print("订单详情页面"+JSON.stringify(data));
            var re_data = JSON.parse(data.data);
            
            if(re_data.id){
                var order_id = re_data.id;
                var orderNo  = re_data.order_no;
                var subject  = course_name;
                var body_str = course_name;
                user_id = re_data.user_id;
                app.openPage({
                    source: "source://view/course/pay.ui",
                    data:{"orderNo":orderNo,"subject":subject,"body_str":body_str,"total_fee":totalFee,"user_id":user_id,"course_id":course_id,"order_id":order_id,"course_name":course_name,"from":"course_detail"},
                    statusBarState : "transparent",
                    id:"pay"
                });
            }else{
                nf.toast("订单创建失败，请重试！");
            }
        });
    }else{
        app.openPage({
            source: "source://view/me/login.ui",
            data:{"is_goto_course": 1},
            statusBarState : "transparent"
        });
    }
});
*/



//显示课程名称和简介
ui("btn_show_detail").on("touch", function(){
    ui("btn_video_course").fontColor = "000000FF";
    ui("btn_live_course").fontColor = "000000FF";
    ui("btn_show_detail").fontColor = "D54343FF";
    period_list.visible = false;
    live_list.visible = false;
   // replay_list.visible = false;
	ui("lab_no_period").visible = false;
    ui("web_detail").visible = true;
});

ui("btn_live_course").on("touch", function(){
	livelistdata.removeAll();
	live_list.refreshItems();
	live_num = 0;
	ShowCourseLiveLesson(1);    
	live_list.rebound();
	live_page_num = 1;
    ui("btn_live_course").fontColor = "D54343FF";
    ui("btn_video_course").fontColor = "000000FF";
    ui("btn_show_detail").fontColor = "000000FF";
    period_list.visible = false;
    live_list.visible = true;
    //replay_list.visible = false;
    ui("web_detail").visible = false;
    if(live_num){
    	ui("lab_no_period").visible = false;
    }else{
    	ui("lab_no_period").visible = true;
    }
});

ui("btn_video_course").on("touch", function(){
	periodlistdata.removeAll();
	period_list.refreshItems();
	period_num = 0;
	ShowCoursePeriod(1);    
	period_list.rebound();
	period_page_num = 1;
    ui("btn_live_course").fontColor = "000000FF";
    ui("btn_video_course").fontColor = "D54343FF";
    ui("btn_show_detail").fontColor = "000000FF";
    period_list.visible = true;
    live_list.visible = false;
   // replay_list.visible = false;
    ui("web_detail").visible = false; 
    if(period_num){
    	ui("lab_no_period").visible = false;
    }else{
    	ui("lab_no_period").visible = true;
    } 
});
/*ui("lay_to_share").on("touch", function(){
    ui("lay_share").visible = true;
});
*/

/*ui("lay_wx_share").on("touch", function(){
	ui("lay_share").visible = false;	
	ShareWX();	
});*/

/*ui("img_close_chare").on("touch", function(){
    ui("lay_share").visible = false;
});*/
/*
function ShareWX(){
    var course_url = con.COURSE_BASE_URL + course_id;
    deviceone.print("to share " + course_url);
    var para = {
        appId: con.WX_APPID,
        scene: "1",  //0：分享到微信好友；1：分享到微信朋友圈
        type: "0",
        title: course_name,
        content: course_description,
        url: course_url,
        image: "",
        audio: ""
    }
    we.share(para, function(data, e){
    	deviceone.print("share result" + JSON.stringify(e));
        if (data == true){
            nf.toast("分享成功");
            deviceone.print("share success");
        }else{
            nf.toast("分享失败");
            deviceone.print("share failed");
        }

    });
}
*/
page.on("result", function(data) {
    ShowCourseInfo();
    //ui("lab_no_period").visible = false;
    ui("btn_live_course").fontColor = "000000FF";
    ui("btn_video_course").fontColor = "D54343FF";
    ui("btn_show_detail").fontColor = "000000FF";
    ui("web_detail").visible = false;
    period_list.visible = true;
    live_list.visible = false;
    //replay_list.visible = false;
	periodlistdata.removeAll();
	period_list.refreshItems();
	period_num = 0;
	ShowCoursePeriod(1);    
	period_list.rebound();
	period_page_num = 1;   
/*    
    var current_index = ui("btn_period_type").index;
    if(current_index == 0){
        period_list.visible = true;
        live_list.visible = false;
        replay_list.visible = false;
    	periodlistdata.removeAll();
    	period_list.refreshItems();
    	period_num = 0;
    	ShowCoursePeriod(1);    
    	period_list.rebound();
    	period_page_num = 1;    	
    }else if(current_index == 1){
        period_list.visible = false;
        live_list.visible = true;
        replay_list.visible = false;
    	livelistdata.removeAll();
    	live_list.refreshItems();
    	live_num = 0;
    	ShowCourseLiveLesson(1);    
    	live_list.rebound();
    	live_page_num = 1;	
    }else if(current_index == 2){
        period_list.visible = false;
        live_list.visible = false;
        replay_list.visible = true;
    	replaylistdata.removeAll();
    	replay_list.refreshItems();
    	replay_num = 0;
    	ShowCourseReplayLesson(1);    
    	replay_list.rebound();
    	replay_page_num = 1;
    }*/
});