/**
 * related to seg_content_cell.ui
 * 
 * @Author : zhangll_927@163.com
 * @Timestamp : 2017-08-31
 */
var page = sm ("do_Page");
var app = sm ("do_App");
var root = ui ("$");

root.setMapping({
	"lab_name.text":"title",
	"lab_name.tag":"id",
	"lay_underline.tag":"selected",		
})
root.on("dataRefreshed", function(){
	if(ui("lay_underline").tag == 1){
		ui("lab_name").fontColor = "4194E0FF";
		ui("lay_underline").bgColor = "4194E0FF";
	}else{
		ui("lab_name").fontColor = "000000FF";
		ui("lay_underline").bgColor = "FFFFFFFF";
	}
})

ui("lay_cell").on("touch",function(data){
	var id = ui("lab_name").tag;
	var data = {"id": id};
	page.fire("seg_touch", data);
});

page.on("segtouched", function(data) {
	var id = ui("lab_name").tag;
	if(id == data){
		ui("lab_name").fontColor = "4194E0FF";
		ui("lay_underline").bgColor = "4194E0FF";
	}else{
		ui("lab_name").fontColor = "000000FF";
		ui("lay_underline").bgColor = "FFFFFFFF";
	}
});