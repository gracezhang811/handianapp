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

var list_indication = ui ("list_indication")
var token = datacache.loadData("PublicLogin")

var search_list = mm ("do_ListData");


list_indication.bindItems(search_list);

ui("btn_search").on("touch", function(){
	var keyword = ui("text_search").text.trim();
	 account.Search_Indication(keyword,token, function(data) {
		ui("text_search").text = ""; 
		search_list.removeAll();
		list_indication.refreshItems();
	 	if(data["data"]["products"].length > 0){
	 		ui("lab_noresults").visible = false;
		 	search_list.addData(data["data"]["products"]);
		 	list_indication.refreshItems();
		 	page.hideKeyboard();
	 	}else{
	 		ui("lab_noresults").visible = true;
	 		page.hideKeyboard();
	 	}
	})
	
})

 list_indication.on("touch",function(data){
	var gridId = search_list.getOne(data);
	app.openPage({
		source:"source://view/product/decription_production.ui",
		animationType: "slide_r2l",
		statusBarState:"transparent",
		data:JSON.stringify(gridId)
	})
})
 