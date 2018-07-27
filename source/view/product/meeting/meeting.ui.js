/**
 * related to meeting.ui
 * 
 * @Author : null
 * @Timestamp : 2017-08-15
 */
var page = sm("do_Page");
var nf = sm("do_Notification");
var app = sm ("do_App");
var meetingurl = page.getData();


var do_Web_meeting = ui ("do_Web_meeting");

page.on("back", function(){ 
	if(do_Web_meeting.canBack() == true){
		do_Web_meeting.back();
	}else{
		app.closePage();
	}
});

ui("lay_goback").on("touch", function () {
	app.closePage();	
});

ui("lay_webback").on("touch", function () {
	if(do_Web_meeting.canBack() == true){
		do_Web_meeting.back();
	}else{
		app.closePage();
	}
});


do_Web_meeting.url="http://wechat-admin.handianmedicine.com/index.php?s=/addon/Meeting/Wap/index/meeting_id/97/publicid/18.html"