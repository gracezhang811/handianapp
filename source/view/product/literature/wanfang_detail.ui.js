/**
 * related to wanfang_detail.ui
 * 
 * @Author : zhangll_927@163.com
 * @Timestamp : 2017-12-27
 */

var app = sm ("do_App");
var page = sm ("do_Page");
var nf = sm ("do_Notification");
var datacache = sm("do_DataCache")
var invoke = require("httpinvoke");
var con = require("const");
var account = require("account");

var id = page.getData().id;
var type = page.getData().type;
var title = page.getData().title;

//ui("lab_title").text = title;
var token = datacache.loadData("PublicLogin")

var checkuserpower = 0;
var pdfname = "";
var pdfurl = "";
var hasOriginalDoc = 0;

 var do_back = ui ("do_back");
 do_back.on("touch",function(){
	 app.closePage();
 })
 page.on("back",function(){
	 app.closePage();
 })
 
 getwanfangdetail();
 
 function getwanfangdetail(){
		account.GetWanfangPaperDetail(id, type, token, function(data) {
			if(data.data){
				ui("lab_title").text = data.data.literature.source + "  " + data.data.literature.year;
				ui("lab_papertitle").text = data.data.literature.title;
				ui("lab_author").text = "作者：" + data.data.literature.creator;
				ui("lab_organization").text = "作者单位：" + data.data.literature.organization;
				ui("lab_abstracts").text = data.data.literature.abstracts;		
				hasOriginalDoc = data.data.literature.hasOriginalDoc;
				deviceone.print("hasOriginalDoc = hasOriginalDoc" + hasOriginalDoc);
			}else{
				nf.toast("获取文献信息失败。");
			}			
		})
 }
 
 ui("btn_readpaper").on("touch", function(){
	 var userphone = datacache.loadData(con.CK_USER_PHONE);
	 if(userphone){
		 account.CheckUserStatus(userphone, token, function(data) {
			 if(data.data.userDetail){
				 if(data.data.userDetail.spare1 == "no"){
					 nf.alert("您没有权限访问该文献！");
				 }else{
					 if(hasOriginalDoc == 0){
						 nf.alert("该文献没有全文！");
					 }else{
							deviceone.print("to get download url.");
							account.GetWanfangPaperDownload(id, type, token, function(data){
								if(data.data == "No pdf"){	
									nf.alert("该文献没有全文！");
								}else{
									pdfname = data.data.literature.title;
									pdfurl = data.data.literature.spare1;
									deviceone.print("pdf url = " + pdfurl);		
									app.openPage({
										source: "source://view/product/literature/pdfread.ui",
										data:{
											"pdfurl": pdfurl,
											"pdfname": pdfname
										},
										statusBarState : "transparent"
									});	
								}
							});	 
					 }
				 }
			 }else{
				 nf.alert("您没有权限访问该文献！");	
			 }
		 })		 
	 }else{
			app.openPage({
				source: "source://view/user/login.ui",
				statusBarState : "transparent"
			});
	 }

 })
 