var page= sm("do_Page");
var app = sm ("do_App");
var nf = sm ("do_Notification");

var root = ui("$");

root.setMapping({
		"lab_yaocaoname.text":"term",
		"lab_yaocaoname.tag":"id"
});

ui ("lay_cell").on("touch", function(){
	var name = ui("lab_yaocaoname").text;
	var id = ui("lab_yaocaoname").tag;

	app.openPage({
		source: "source://view/product/mingci/mingci_detail.ui",
		data:{
			"name": name,
			"id": id
		},
		statusBarState : "transparent"
	});

});