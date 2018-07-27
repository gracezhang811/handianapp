/**
 * related to main.ui
 * 
 * @Author : √流浪者
 * @Timestamp : 2017-07-19
 */
var app = sm ("do_App");
var page = sm ("do_Page");
var UM = sm("do_UMengAnalytics");
var nf = sm ("do_Notification");
var datacache = sm ("do_DataCache");
var external = sm("do_External");
var global = sm("do_Global");
var account = require("account");
var con = require("const");
var edu = require("education");
var invoke = require("httpinvoke");
var news_list = ui("list_news");
var news_list_data = mm("do_ListData");
var device = sm("do_Device");

news_list.bindItems(news_list_data);

var ischeckversion = 0;
var currentversion = "2.6.0";

var root = ui("$");

var token = datacache.loadData("PublicLogin");

page.on("resume", function(data, e) {
	UM.beginPageLog({pageName:"page_mainpage"});
	deviceone.print("--umeng + page_mainpage" );
});

page.hideKeyboard();

//搜索
var do_text_search = ui ("do_text_search");
var do_butt_search = ui ("do_butt_search");
do_butt_search.on("touch",function(){
	//do_text_search.text = "";
	app.openPage({
		source:"source://view/product/search/search.ui",
		animate: "slide_r2l",
		statusBarState: "transparent",
		data:do_text_search.text
	})
})

do_text_search.on("enter",function(){
	//do_text_search.text = "";
	app.openPage({
		source:"source://view/product/search/search.ui",
		animate: "slide_r2l",
		statusBarState: "transparent",
		data:do_text_search.text
	})
})

//轮播图
var do_index_banner = ui ("do_index_banner");
var slideimg = mm ("do_ListData");
do_index_banner.bindItems(slideimg);
var bannerimg = [{
	"i_source":"source://image/product_banner0.jpg"
},{
	"i_source":"source://image/product_banner2.jpg"
},{
	"i_source":"source://image/product_banner3.jpg"
},{
	"i_source":"source://image/product_banner1.jpg"
}]
slideimg.addData(bannerimg);
do_index_banner.refreshItems();
do_index_banner.startLoop(6000);

var do_Label_1 = ui ("do_Label_1");
do_index_banner.on ("indexChanged",function(index){
	var  i = index+1
	do_Label_1.text = i + "/4"
})

do_index_banner.on("touch", function(){
	page.hideKeyboard();
});

//导航列表
var do_ALayout_zix = ui ("do_ALayout_zix");
var do_ALayout_wenx = ui ("do_ALayout_wenx");
var do_ALayout_jiaoy = ui ("do_ALayout_jiaoy");
var do_ALayout_huiy= ui ("do_ALayout_huiy");
var do_ALayout_wen = ui ("do_ALayout_wen");
var do_ALayout_zhu = ui ("do_ALayout_zhu");
var do_ALayout_yaodian = ui ("do_ALayout_yaodian");
var do_ALayout_more = ui ("do_ALayout_more");

//资讯
do_ALayout_zix.on("touch",function(){
	app.openPage({
		source:"source://view/product/information/information.ui",
		statusBarState: "transparent",
		animationType: "slide_r2l"
	})
})
//文献
do_ALayout_wenx.on("touch",function(){
	app.openPage({
		source:"source://view/product/literature/literature_sort.ui",
		statusBarState: "transparent",
		animationType: "slide_r2l"
	})
})
//医问
do_ALayout_wen.on("touch",function(){
	app.openPage({
		source:"source://view/school/live_course_list.ui",
		statusBarState: "transparent",
		animationType:"slide_r2l"
	})
})
//用药助手
do_ALayout_zhu.on("touch",function(){
	app.openPage({
		source:"source://view/product/assistant/main.ui",
		keyboardMode: "hidden",
		statusBarState: "transparent"
	})
})
//会议
/*
do_ALayout_huiy.on("touch",function(){
	app.openPage({
		source:"source://view/product/meeting/meeting.ui",
		statusBarState: "transparent",
		animationType:"slide_r2l"
	})
})
*/
do_ALayout_huiy.on("touch",function(){
	app.openPage({
		source:"source://view/product/mingci/mingci.ui",
		statusBarState: "transparent",
		animationType:"slide_r2l"
	})
})

//药典
do_ALayout_yaodian.on("touch",function(){
	app.openPage({
			source:"source://view/product/yaodian/yaodian.ui",
			keyboardMode: "hidden",
			statusBarState: "transparent"
		})
})

//教育
do_ALayout_jiaoy.on("touch",function(){
	app.openPage({
			source:"source://view/school/tushuguan_center.ui",				
			keyboardMode: "hidden",
			statusBarState: "transparent"
		})
})

//茶业
do_ALayout_more.on("touch",function(){
	//nf.alert("更多医学应用敬请期待。");
	app.openPage({
		source:"source://view/product/tea/tea.ui",
		statusBarState: "transparent",
		animationType:"slide_r2l"
	})
})

checkversion();
newsList();
LinkHandian();

function LinkHandian(){	
	var url = con.handianmainpage;
	account.LinkHandian(url, function(data) {		
	})
}

function checkversion(){
	if(ischeckversion == 0){
		account.GetVersion(token, function(data) {
			currentversion = global.getVersion().ver;
			deviceone.print("current version = " + currentversion);
			deviceone.print("newest version = " + data.data.spare1);
			ischeckversion = 1;
			var newlink = "";
			if((device.getInfo().OS[0] == "A")||(device.getInfo().OS[0] == "a")){
				deviceone.print("uses system = " + device.getInfo().OS);
				newlink = data.data.link;
			}else if((device.getInfo().OS[0] == "O")||(device.getInfo().OS[0] == "o")){
				deviceone.print("uses system = " + device.getInfo().OS);
				newlink = data.data.spare2;
			}
			
			if(data.data.spare1 == currentversion){
				deviceone.print("no need to updata");
			}else{
				deviceone.print("need to updata");
				nf.confirm("是否更新到最新版本？", "提示", "确定", "取消", function(data, e) {
					if(data == 1){
						external.openURL(newlink);
					}else{
						deviceone.print("user do not updata");
					}
				})
				
			}
		})		
	}else{
		
	}
}


function newsList(){ 
    edu.InfoList(function(data){
        if(data.results) {
            var re_data = data.results;
            //var newsnum = re_data.length;
            for(var i = 0;i<re_data.length;i++){
                var tmp_data = {
                    "id":re_data[i].id,
                    "template":0,
                    "small_cover_url":re_data[i].small_cover_url,
                    "medium_cover_url":re_data[i].medium_cover_url,
                    "title":re_data[i].title,
                    "publish_at":invoke.DateFormat(re_data[i].publish_at),
                };               
                news_list_data.addOne(tmp_data);
            }
            news_list.refreshItems();
        }
    });
}

page.on("result", function(){
	do_text_search.text = "";
})