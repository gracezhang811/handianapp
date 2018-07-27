/**
 * related to list_templets00.ui
 * 
 * @Author : √流浪者
 * @Timestamp : 2017-07-20
 */

var page = sm("do_Page");
var app = sm ("do_App");

var root = ui("$");

var do_Imagelist0 = ui ("do_Imagelist0");
var do_Label_title = ui("do_Label_title");
var do_right_title = ui("do_right_title");
var do_Label_cont = ui("do_Label_cont");

root.setMapping({
	"do_Imagelist0.source":"image1",
	"do_Label_title.text":"fenlei",
	"do_Label_title.tag":"sort_id",
	"do_Label_title.fontColor":"flColor",
	"do_right_title.text":"title",
	"do_Label_cont.text":"content"
})

ui("lay_cme").on("touch",function(){
	if(ui("do_Label_title").tag == 0){
	    app.openPage({
	        source : "source://view/school/handianshuyuan.ui",
	        statusBarState : "transparent",
	    });		
	}else if(ui("do_Label_title").tag == 1){
	    app.openPage({
	        source : "source://view/school/tushuguan_center.ui",
	        statusBarState : "transparent",
	    });	
	}

});
