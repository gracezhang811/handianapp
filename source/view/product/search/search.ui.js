/**
 * related to search.ui
 * 
 * @Author : null
 * @Timestamp : 2017-08-14
 */
var app = sm ("do_App");
var page = sm ("do_Page");
var nf = sm ("do_Notification");
var datacache = sm("do_DataCache")
var account = require("account")
var keyword = page.getData();

var do_ListView_search = ui ("do_ListView_search")
var token = datacache.loadData("PublicLogin")

 var do_back = ui ("do_back");
 do_back.on("touch",function(){
	 app.closePage();
 })
 page.on("back",function(){
	 app.closePage();
 })
 var search_list = mm ("do_ListData");
 do_ListView_search.bindItems(search_list);
 account.Sear_ch(keyword,token, function(data) {
 	var search_data = data["data"]["literature"]
 	search_list.addData(search_data);
 	do_ListView_search.refreshItems();
 })
 
 
