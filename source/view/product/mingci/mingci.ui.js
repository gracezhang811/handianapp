/**
 * related to yaodian.ui
 * 
 * @Author : zhangll_927@163.com
 * @Timestamp : 2017-10-25
 */
var app = sm ("do_App");
var page = sm ("do_Page");
var nf = sm ("do_Notification");
var datacache = sm("do_DataCache")
var UM = sm("do_UMengAnalytics");
var account = require("account")


var token = datacache.loadData("PublicLogin")

var caoyaodata = mm ("do_ListData");
var list_caoyao = ui("list_caoyao")

var pinyindata = mm ("do_ListData");
var grid_pinyin = ui("grid_pinyin")

page.on("back", function(){ 
	app.closePage() 
});

ui("lay_goback").on("touch", function () {
    app.closePage();
});

page.on("resume", function(data, e) {
	UM.beginPageLog({pageName:"page_mingci"});
	deviceone.print("--umeng + page_mingci" );
});

list_caoyao.bindItems(caoyaodata);
grid_pinyin.bindItems(pinyindata);

var usedpinyin = [{"name": "A"},
                  {"name": "B"},
                  {"name": "C"},
                  {"name": "D"},
                  {"name": "E"},
                  {"name": "F"},
                  {"name": "G"},
                  {"name": "H"},
                  {"name": "J"},
                  {"name": "K"},
                  {"name": "L"},
                  {"name": "M"},
                  {"name": "N"},
                  {"name": "O"},
                  {"name": "P"},
                  {"name": "Q"},
                  {"name": "R"},
                  {"name": "S"},
                  {"name": "T"},
                  {"name": "W"},
                  {"name": "X"},
                  {"name": "Y"},
                  {"name": "Z"},
                  ];
pinyindata.addData(usedpinyin);
grid_pinyin.refreshItems();



ui("btn_search").on("touch", function(){
	var keyword = ui("text_search").text.trim();
	 account.SearchMingci(keyword, token, function(data) {
		ui("text_search").text = ""; 
		caoyaodata.removeAll();
		list_caoyao.refreshItems();
	 	if(data["data"].length > 0){
	 		ui("lab_noresults").visible = false;
	 		caoyaodata.addData(data["data"]);
	 		list_caoyao.refreshItems();
	 	}else{
	 		ui("lab_noresults").visible = true;
	 	}
	})
	
})

page.on("pinyin_touch", function(data){
	var cate = data.cate;
	 account.SearchMingciSort(cate, token, function(data) {
			caoyaodata.removeAll();
			list_caoyao.refreshItems();
		 	if(data["data"].length > 0){
		 		ui("lab_noresults").visible = false;
		 		caoyaodata.addData(data["data"]);
		 		list_caoyao.refreshItems();
		 	}else{
		 		ui("lab_noresults").visible = true;
		 	}
		})
})
