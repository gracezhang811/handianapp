/**
 * related to medicine.ui
 * 
 * @Author : zhangll_927@163.com
 * @Timestamp : 2017-08-28
 */
var app = sm ("do_App");
var page = sm ("do_Page");
var nf = sm ("do_Notification");
var datacache = sm("do_DataCache")
var account = require("account")

var list_hot = ui ("list_hot")
var token = datacache.loadData("PublicLogin")

var search_list = mm ("do_ListData");
list_hot.bindItems(search_list);

page.on("showhot", function(data){
	search_list.removeAll();
	list_hot.refreshItems();
 	search_list.addData(data);
 	list_hot.refreshItems();
});


list_hot.on("touch",function(data){
	var gridId = search_list.getOne(data);
	app.openPage({
		source:"source://view/product/decription_production.ui",
		animationType: "slide_r2l",
		statusBarState:"transparent",
		data:JSON.stringify(gridId)
	})
})
 