/**
 * related to info_detail.ui
 * 
 * @Author : zhangll_927@163.com
 * @Timestamp : 2017-08-22
 */
var app        = sm("do_App");
var page       = sm("do_Page");
var con        = require("const");
var nf         = sm("do_Notification");
var invoke     = require("httpinvoke");
var edu 	   = require("education");
var data_cache = deviceone.sm("do_DataCache");
var httpinvoke = require("httpinvoke");
var news_id = page.getData().news_id;


var do_back = ui ("do_back");

do_back.on("touch",function(){
	 app.closePage();
})
page.on("back",function(){
	 app.closePage();
})

infodetail(news_id);

function infodetail(news_id){ 
    edu.InfoDetail(news_id, function(data){
    	ui("lab_info_title").text = data.title;
    	ui("web_info_content").loadString(data.content);
    	
    });
}
