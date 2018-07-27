/**
 * related to pdfread.ui
 * 
 * @Author : zhangll_927@163.com
 * @Timestamp : 2017-08-21
 */

var app = sm ("do_App");
var page = sm ("do_Page");
var nf = sm ("do_Notification");
var datacache = sm("do_DataCache")
var invoke = require("httpinvoke")
var con = require("const")

var pdfurl = page.getData().pdfurl;
var pdfname = page.getData().pdfname;
var path = "data://download/" + pdfname;

var token = datacache.loadData("PublicLogin")

 var do_back = ui ("do_back");
 do_back.on("touch",function(){
	 app.closePage();
 })
 page.on("back",function(){
	 app.closePage();
 })
 
 ui("lab_title").text = pdfname;
 downloadliterature();
 
 function downloadliterature(){
	 invoke.InvokeDownload(pdfurl,token,path, function() {
	 	ui("pdf_reader").url = path;
	 })
 }
 
 