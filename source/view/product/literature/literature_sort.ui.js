
var app = sm ("do_App");
var page = sm ("do_Page");
var UM = sm("do_UMengAnalytics");
var nf = sm ("do_Notification");
var datacache = sm("do_DataCache")
var account = require("account")
var con = require("const")
var keyword = page.getData();

var do_ListView_literature = ui ("do_ListView_literature")
var token = datacache.loadData("PublicLogin")

var seg_paper_sort = ui("seg_paper_sort");
var list_wanfang_paper = ui("list_wanfang_paper");
var lay_wanfang_paper = ui("lay_wanfang_paper");
var literature_list = mm ("do_ListData");
var seg_data = mm("do_ListData");
var wanfang_data = mm ("do_ListData");
var current_pagenum = 1;
var total_page = 0;


var do_back = ui ("do_back");

 do_back.on("touch",function(){
	 app.closePage();
	 page.hideKeyboard();
 })
 page.on("back",function(){
	 app.closePage();
	 page.hideKeyboard();
 })

 page.on("resume", function(data, e) {
	UM.beginPageLog({pageName:"page_wenxian"});
	deviceone.print("--umeng + page_wenxian" );
});
 
  var seg_list = [{	
	"title":"药品文献",
	"selected":1,
	"id": 0
},{
	"title":"万方文献",
	"selected":0,
	"id": 1
}]
seg_data.addData(seg_list);
seg_paper_sort.bindItems(seg_data)
seg_paper_sort.refreshItems();

do_ListView_literature.bindItems(literature_list);
list_wanfang_paper.bindItems(wanfang_data); 

ShowMedicine();
ShowWanfangOfFirstPage();

page.on("seg_touch", function(data) {
	deviceone.print("recv---" + data);
	if(data== 0){
		page.fire("segtouched", 0);
		do_ListView_literature.visible = true;
		lay_wanfang_paper.visible = false;
		
	}else if(data== 1){
		page.fire("segtouched", 1);
		do_ListView_literature.visible = false;
		lay_wanfang_paper.visible = true;
		
	}	
})
 
function ShowMedicine(){
	account.Search_Hot(token, function(data) {
		literature_list.removeAll();
		do_ListView_literature.refreshItems();
		literature_list.addData(data.data.products);
		do_ListView_literature.refreshItems();	
	})
}

function ShowWanfangOfFirstPage(){
	//var search_title = ui("text_searchtitle").text.trim();
	ui("text_searchtitle").text="";
	current_pagenum = 1;
	wanfang_data.removeAll();
	list_wanfang_paper.refreshItems();
	ui("btn_nextpage").visible = false;
	/*
	account.GetWanfangPaperSearchList("", 1,token, function(data) {
		wanfang_data.removeAll();
		list_wanfang_paper.refreshItems();
		wanfang_data.addData(data.data.page.results);
		list_wanfang_paper.refreshItems();	
		current_pagenum = 1;
		total_page = data.data.page.totalPage;
	})
	*/
}

function ShowWanfang(pagenum){
	var search_title = ui("text_searchtitle").text.trim();
	account.GetWanfangPaperSearchList(search_title, pagenum,token, function(data) {
		total_page = data.data.page.totalPage;
		wanfang_data.addData(data.data.page.results);
		list_wanfang_paper.refreshItems();	
	})
}

ui("btn_search").on("touch", function(data) {     	
	page.hideKeyboard();
	ui("lab_noresult").visible = false;
	wanfang_data.removeAll();
	list_wanfang_paper.refreshItems();
	ui("btn_nextpage").visible = true;
	var search_title = ui("text_searchtitle").text.trim();
	account.GetWanfangPaperSearchList(search_title, 1,token, function(data) {
		total_page = data.data.page.totalPage;
		current_pagenum = 1;
		wanfang_data.addData(data.data.page.results);
		list_wanfang_paper.refreshItems();	
		if(total_page == 1){
			ui("btn_nextpage").text="数据已加载完";
			ui("btn_nextpage").enabled = false;
		}
		if(data.data.page.totalRecord == 0){
			ui("lab_noresult").visible = true;
		}else{
			ui("lab_noresult").visible = false;
		}
	})
});

ui("text_searchtitle").on("enter", function(data) {     	
	page.hideKeyboard();
	ui("lab_noresult").visible = false;
	wanfang_data.removeAll();
	list_wanfang_paper.refreshItems();
	ui("btn_nextpage").visible = true;
	var search_title = ui("text_searchtitle").text.trim();
	account.GetWanfangPaperSearchList(search_title, 1,token, function(data) {
		total_page = data.data.page.totalPage;
		current_pagenum = 1;
		wanfang_data.addData(data.data.page.results);
		list_wanfang_paper.refreshItems();	
		if(total_page == 1){
			ui("btn_nextpage").text="数据已加载完";
			ui("btn_nextpage").enabled = false;
		}
		if(data.data.page.totalRecord == 0){
			ui("lab_noresult").visible = true;
		}else{
			ui("lab_noresult").visible = false;
		}
	})
});

ui("btn_nextpage").on("touch", function(data) {  
	var search_title = ui("text_searchtitle").text.trim();
	current_pagenum ++;
	if(current_pagenum < total_page ){
		ShowWanfang(current_pagenum);
	}else if(current_pagenum == total_page ){
		ShowWanfang(current_pagenum);
		nf.toast("数据已加载完！");
		ui("btn_nextpage").text="数据已加载完";
		ui("btn_nextpage").enabled = false;
	}else{
		nf.toast("数据已加载完！");
		ui("btn_nextpage").text="数据已加载完";
		ui("btn_nextpage").enabled = false;
	}
	list_wanfang_paper.rebound();
});


