var page = sm("do_Page");

var root = ui("$")
root.setMapping({
	"lab_name.text":"name",
	"lab_name.tag":"selected",
	"lay_cell.tag":"id"
})

root.on("dataRefreshed",function(){
	var _selected = ui("lab_name").tag;
	if(_selected == 1){
		ui("lab_name").fontColor = "4194E0FF";
		ui("lay_underline").bgColor = "4194E0FF";
	}else{
		ui("lab_name").fontColor = "000000FF";
		ui("lay_underline").bgColor = "FFFFFFFF";
	}
})

ui("lay_cell").on("touch",function(data){
	var id = ui("lay_cell").tag;
	var data = {"id": id};
	page.fire("seg_touch", data);
});

page.on("segtouched", function(data) {
	var id = ui("lay_cell").tag;
	if(id == data){
		ui("lab_name").fontColor = "4194E0FF";
		ui("lay_underline").bgColor = "4194E0FF";
	}else{
		ui("lab_name").fontColor = "000000FF";
		ui("lay_underline").bgColor = "FFFFFFFF";
	}
});