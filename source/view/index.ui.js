/**
 * @Author : ��������
 * @Timestamp : 2017-07-18
 */
var nf = sm("do_Notification");
var do_Global = sm ("do_Global");
var app = sm ("do_App");
var page = sm ("do_Page");
var datacache = sm("do_DataCache")
var con = require("const");
var invoke = require("httpinvoke");

var canback = false;
var timer = mm ("do_Timer");
timer.delay = 2000;
timer.interval = 2000;
timer.on("tick",function(){
	timer.stop();
	canback = false;
})
page.on("back",function(){
	if(canback){
		datacache.removeData("PublicLogin");
		do_Global.exit();
	}else {
		timer.start();
		nf.toast("再次点击退出应用！");
		canback = true;
	}
})

var ViewShower_center  = ui ("do_ViewShower_center");
var do_ALayout_product = ui ("do_ALayout_product");
var do_ALayout_school = ui ("do_ALayout_school");
var do_ALayout_problem = ui ("do_ALayout_problem");
var do_ALayout_user = ui ("do_ALayout_user");
var do_product_img = ui ("do_product_img");
var do_school_img = ui ("do_school_img");
var do_problem_img = ui("do_problem_img");
var do_user_img = ui ("do_user_img");
var do_Label_product = ui ("do_Label_product");
var do_Label_school = ui ("do_Label_school");
var do_Label_problem = ui("do_Label_problem");
var do_Label_user = ui ("do_Label_user");

do_ALayout_product.on ("touch",function(){
	do_product_img.source = "source://image/product01.png";
	do_school_img.source = "source://image/school.png";
	do_problem_img.source = "source://image/problem.png";
	do_user_img.source = "source://image/user.png";
	do_Label_product.fontColor = "5694dfFF";
	do_Label_school.fontColor = "999999FF";
	do_Label_problem.fontColor = "999999FF";
	do_Label_user.fontColor = "999999FF";
	ViewShower_center.showView("product");
})
do_ALayout_school.on ("touch",function(){
	do_product_img.source = "source://image/product.png";
	do_school_img.source = "source://image/school01.png";
	do_problem_img.source = "source://image/problem.png";
	do_user_img.source = "source://image/user.png";
	do_Label_product.fontColor = "999999FF";
	do_Label_school.fontColor = "5694dfFF";
	do_Label_problem.fontColor = "999999FF";
	do_Label_user.fontColor = "999999FF";
	ViewShower_center.showView("school")
})
do_ALayout_problem.on ("touch",function(){

	app.openPage({
		source:"source://view/problem/main.ui",
		statusBarState: "transparent",
		animationType:"slide_r2l"
	})
})
do_ALayout_user.on ("touch",function(){
	if(datacache.loadData(con.CK_IS_LOGIN) == 1){
		do_product_img.source = "source://image/product.png";
		do_school_img.source = "source://image/school.png";
		do_problem_img.source = "source://image/problem.png";
		do_user_img.source = "source://image/user01.png";
		do_Label_product.fontColor = "999999FF";
		do_Label_school.fontColor = "999999FF";
		do_Label_problem.fontColor = "999999FF";
		do_Label_user.fontColor = "5694dfFF";
		ViewShower_center.showView("user");				
	}else{
		app.openPage({
			source:"source://view/user/login.ui",
			statusBarState: "transparent",
			animationType:"slide_r2l"
		})
	}

})



var list_show = [{
	"id":"product",
	"path":"source://view/product/main.ui"
},{
	"id":"school",
	"path":"source://view/school/main.ui"
},{
	"id":"user",
	"path":"source://view/user/main.ui"
}]
ViewShower_center.addViews(list_show);
ViewShower_center.showView("product");


page.on("logout", function(){
	do_product_img.source = "source://image/product01.png";
	do_school_img.source = "source://image/school.png";
	do_problem_img.source = "source://image/problem.png";
	do_user_img.source = "source://image/user.png";
	do_Label_product.fontColor = "5694dfFF";
	do_Label_school.fontColor = "999999FF";
	do_Label_problem.fontColor = "999999FF";
	do_Label_user.fontColor = "999999FF";
	ViewShower_center.showView("product");
});