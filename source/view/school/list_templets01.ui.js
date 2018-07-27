var page = sm("do_Page");
var app = sm ("do_App");

var root = ui("$");

var do_Imagelist1 = ui ("do_Imagelist1");
var do_Label_title1 = ui("do_Label_title1");
var do_Label_body = ui("do_Label_body");

root.setMapping({
	"do_Imagelist1.source":"image1",
	"do_Label_title1.text":"fenlei1",
	"do_Label_title1.tag":"sort_id",
	"do_Label_title1.fontColor":"flColor1",	
	"do_Label_body.text":"body"
})

ui("lay_coursecenter").on("touch",function(){
	if(ui("do_Label_title1").tag == 4){
	    app.openPage({
	        source : "source://view/school/piwei_center.ui",
	        statusBarState : "transparent",
	    });	
	}else if(ui("do_Label_title1").tag == 3){
	    app.openPage({
	        source : "source://view/school/gushang_center.ui",
	        statusBarState : "transparent",
	    });	
	}else if(ui("do_Label_title1").tag == 18){
	    app.openPage({
	        source : "source://view/school/ganbing_center.ui",
	        statusBarState : "transparent",
	    });	
	}
	else if(ui("do_Label_title1").tag == 19){
	    app.openPage({
	        source : "source://view/school/xinfei_center.ui",
	        statusBarState : "transparent",
	    });	
	}
});
