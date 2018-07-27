/**
 * related to yaocaoimg.ui
 * 
 * @Author : zhangll_927@163.com
 * @Timestamp : 2017-10-25
 */
var app = sm("do_App");
var page = sm("do_Page");
var deviceone = require("deviceone");
var nf = sm("do_Notification");
var rootview = ui("$");

rootview.setMapping({
    "yaocao_img.source": "image",
});


ui("lay_cell").on("touch", function(){
	deviceone.print("img url = " + ui("yaocao_img").source);
})