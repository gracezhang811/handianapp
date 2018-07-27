/**
 * related to main.ui
 * 
 * @Author : √流浪者
 * @Timestamp : 2017-07-19
 */
var app = sm("do_App");
var nf = sm("do_Notification");
var page = sm("do_Page");
var data_cache = sm("do_DataCache");
var global = sm ("do_Global");

var root = ui ("$");
var account = require("account");
var edu = require("education");
var con = require("const");
var invoke = require("httpinvoke");

var coursedata = mm("do_ListData");
var course_list = ui("list_course");

course_list.bindItems(coursedata);

root.on("touch",function(){
	page.hideKeyboard();
})

ui("btn_logout").on("touch", function(){
	data_cache.saveData(con.CK_IS_LOGIN, 0);
	data_cache.saveData(con.CK_USER_ID, "");
	data_cache.saveData(con.CK_EDU_TOKEN, "");
	data_cache.saveData(con.CK_REFRESH_TOKEN, "");
	data_cache.saveData(con.CK_USER_NAME, "");
	data_cache.saveData(con.CK_USER_PHONE, "");
	invoke.GetTokenWithoutLogin(function(data){
		deviceone.print("GetTokenWithoutLogin");
		data_cache.saveData(con.CK_EDU_TOKEN, data.access_token);
		data_cache.saveData(con.CK_REFRESH_TOKEN, data.refresh_token);
		data_cache.saveData(con.CK_TOKEN_TYPE, 0);	
		ui("do_Image_headimg").source = "";
		ui("do_Label_name").text = "";
		ui("do_Label_pf").text = "";
		ui("lab_phone").text = "";
		ui("lab_mail").text = "";
		ui("lab_idcard").text = "";
		ui("lab_male").text = "";
		ui("lab_company").text = "";
		ui("lab_job").text = "";
		ui("lab_role").text = "";
		ui("btn_logout").visible = false;
		coursedata.removeAll();
		course_list.refreshItems();
		page.fire("logout");
	});
})
//root.add("header_id","source://view/in_header.ui",0,0);
//var header_id= ui("header_id"+".do_Label_1");
//header_id.text="个人中心"

ShowUserInfo();

function ShowUserInfo(){
	var login_status = data_cache.loadData(con.CK_IS_LOGIN);
	if(login_status != 1){
		app.openPage({
			source:"source://view/user/login.ui",
			statusBarState: "transparent",
			animationType:"slide_r2l"
		})
	}else{
		edu.GetUserInfo(function(data) {
			if((data.status == 401)||(data.phone == "")){
				app.openPage({
					source:"source://view/user/login.ui",
					statusBarState: "transparent",
					animationType:"slide_r2l"
				})				
			}else{
				ui("do_Image_headimg").source = data.avatar_url;
				ui("do_Label_name").text = data.screen_name;
				ui("do_Label_pf").text = data.scores;
				ui("lab_phone").text = data.phone;
				ui("lab_mail").text = data.email;
				ui("lab_idcard").text = data.identity_card_num;
				if(data.gender == "f"){
					ui("lab_male").text = "女";
				}else if(data.gender == "m"){
					ui("lab_male").text = "男";
				}else if(data.gender == "n"){
					ui("lab_male").text = "保密";
				}
				
				ui("lab_company").text = data.company;
				ui("lab_job").text = data.job;
				ui("lab_role").text = data.honor;
				ui("btn_logout").visible = true;
				data_cache.saveData(con.CK_USER_ID, data.id)
				coursedata.removeAll();
				course_list.refreshItems();
				ShowJoinedCourse(data.id);				
			}

		});
	}
};

function RebuildCourseData(data){
	var i = 0;
	while(data[i]){
		if(data[i].status == 0){
			data[i]["learn_status"] = "待学习";
		}else if(data[i].status == 1){
			data[i]["learn_status"] = "学习中";
		}else if(data[i].status == 2){
			data[i]["learn_status"] = "已学完";
		}
		if(data[i].course.small_cover_url){
			data[i]["showimage"] = encodeURI(data[i].course.small_cover_url);
		}else{
			data[i]["showimage"] = "source://image/default_course.png";
		}
		if(data[i].course.live == true){
			data[i]["showlive"] = true;
		}else{
			data[i]["showlive"] = false;
		}		
		i++;
	}
}


function ShowJoinedCourse(user_id){
	edu.JoinedCourseList(user_id, function(data) {
		if(data.results){
			RebuildCourseData(data.results);
			coursedata.addData(data.results);			
		}
		course_list.height = (data.count)*196;		
		course_list.refreshItems();
		course_list.redraw();
	})
}

page.on("result", function(){
	ShowUserInfo();
});
