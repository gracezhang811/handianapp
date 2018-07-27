/**
 * related to segment_template.ui
 * 
 * @Author : √流浪者
 * @Timestamp : 2017-08-16
 */
var do_Label_title = ui("do_Label_title");
var do_Ala_hr= ui ("do_Ala_hr");
var do_root= ui("do_root");
var page = sm("do_Page");

var root = ui("$")
root.setMapping({
	"do_Label_title.text":"title",
	"do_Label_title.tag":"selected",
	"do_root.tag":"id"
})
root.on("dataRefreshed",function(){
	var _selected = do_Label_title.tag;
	if(_selected == "1"){
		do_Label_title.fontColor= "4194e0FF";
		do_Ala_hr.bgColor="4194e0FF"
	}else{
		do_Label_title.fontColor= "000000FF";
		do_Ala_hr.bgColor="00000000"
	}
})

ui("do_root").on("touch", function(){
	deviceone.print("touch---" + do_root.tag);
	page.fire("seg_touch", do_root.tag)
})

page.on("segtouched", function(data) {
	var _selected = do_Label_title.tag;
	if(data == do_root.tag){
		do_Label_title.fontColor= "4194e0FF";
		do_Ala_hr.bgColor="4194e0FF"
	}else{
		do_Label_title.fontColor= "000000FF";
		do_Ala_hr.bgColor="00000000"
	}
})