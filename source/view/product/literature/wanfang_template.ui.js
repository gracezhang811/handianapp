/**
 * related to search_template.ui
 * 
 * @Author : null
 * @Timestamp : 2017-08-14
 */
var page= sm("do_Page");
var app = sm ("do_App");
var datacache = sm("do_DataCache")
var nf = sm ("do_Notification");
var account = require("account")
var con = require("const")
var token = datacache.loadData("PublicLogin")

var do_search_tit= ui ("do_search_tit");

var root = ui("$");

root.setMapping({
	"do_search_tit.text":"title",
	"do_search_tit.tag":"articleId",
	"img_wanfang.tag": "types"
})


ui("lay_medicine").on("touch", function(){
	var id = do_search_tit.tag;
	var type = ui("img_wanfang").tag;
	var title = do_search_tit.text;
	
	app.openPage({
		source: "source://view/product/literature/wanfang_detail.ui",
		data:{
			"id": id,
			"type": type,
			"title":title,
		},
		statusBarState : "transparent"
	});

})
