/**
 * related to decr_nav_templates.ui
 * 
 * @Author : √流浪者
 * @Timestamp : 2017-07-24
 */
var page = sm ("do_Page");
var app = sm ("do_App");
var nf = sm("do_Notification");
var root = ui("$");

var do_Alayout_root = ui ("do_Alayout_root");
var do_Label_lx = ui("do_Label_lx");
var do_ALayout_bor = ui("do_ALayout_bor");


root.setMapping({
	"do_Label_lx.text" : "name",
	"do_Label_lx.tag" : "selected"
})

root.on("dataRefreshed",function(){
	var _selected = do_Label_lx.tag;
	if(_selected == "1"){
		do_Label_lx.fontColor= "5694DFFF";
		do_ALayout_bor.bgColor="5694DFFF"
	}else{
		do_Label_lx.fontColor= "999999FF";
		do_ALayout_bor.bgColor="00000000"
	}
})

do_Alayout_root.on("touch",function(){
	page.fire("selectOneTab", {name:do_Label_lx.text});
})
