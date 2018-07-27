
var app = sm ("do_App");
var page = sm ("do_Page");
var nf = sm ("do_Notification");
var datacache = sm("do_DataCache")
var account = require("account")
var con = require("const")
var keyword = page.getData();

var do_ListView_literature = ui ("do_ListView_literature")
var literature_list = mm ("do_ListData");

var token = datacache.loadData("PublicLogin")

var do_back = ui ("do_back");

 do_back.on("touch",function(){
	 app.closePage();
 })
 page.on("back",function(){
	 app.closePage();
 })
 

do_ListView_literature.bindItems(literature_list);


var productId = page.getData().id;
account.Literature(con.literature, productId, token, function(data) {
		var data_list = data["data"]["literature"];
		literature_list.addData(data_list);
		do_ListView_literature.bindItems(literature_list);
		do_ListView_literature.refreshItems();
	})

