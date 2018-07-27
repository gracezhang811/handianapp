/**
 * related to pinyin_cell.ui
 * 
 * @Author : zhangll_927@163.com
 * @Timestamp : 2017-10-25
 */
var app = sm("do_App");
var httpinvoke = require("httpinvoke");
var nf = sm("do_Notification");
var page = sm("do_Page");
var rootview = ui("$");

rootview.setMapping({
	"lab_pinyin.text": "name",
});

//点击进入草药列表
ui("lay_cell").on("touch", function(){
	var cate = ui("lab_pinyin").text;
	var data = {"cate": cate};
	page.fire("pinyin_touch", data);
	
});