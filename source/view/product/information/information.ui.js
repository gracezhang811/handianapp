var app  = sm("do_App");
var page  = sm("do_Page");
var UM = sm("do_UMengAnalytics");
var con  = require("const");
var nf = sm("do_Notification");
var invoke = require("httpinvoke");
var edu = require("education");
var data_cache = deviceone.sm("do_DataCache");

var current_page = 1;
var pagesize = 10;
var count = 0;
var nextpage   = "";
var newsnum = 0;


var do_back = ui ("do_back");

do_back.on("touch",function(){
	 app.closePage();
})
page.on("back",function(){
	 app.closePage();
})


page.on("resume", function(data, e) {
	UM.beginPageLog({pageName:"page_zixun"});
	deviceone.print("--umeng + page_zixun" );
});

newsList(1);

var news_list = ui("news_list");
var news_list_data = mm("do_ListData");
news_list.bindItems(news_list_data);

ui("btn_nextpage").on("touch", function(){
    if((nextpage != "")&&(nextpage != null)){
        current_page = current_page + 1;
        newsListNext(current_page);
        deviceone.print("pull info 1 time");
    }else{
        nf.toast("已到最后一条");
    }
    news_list.rebound();
})

//下拉数据
news_list.on("pull", function(data) {
    deviceone.print("下拉"+JSON.stringify(data));
    if (data.state == 2) {// 下拉到一定位置松手开始刷新数据
        news_list_data.removeAll();
        news_list.refreshItems();
        current_page = 1;
        newsnum = 0;
        newsList(current_page);
        news_list.rebound();
    }
});




function newsList(search_page){ 
    edu.InfoList(function(data){
        if(data.results) {
        	nextpage = data.next;
            if(search_page < 2){
                //添加轮播图资讯模板
                var tmp_data = {
                        "template":1,
                };
                
                news_list_data.addOne(tmp_data);
            }
            
            var re_data = data.results;
            listlength = 356 + (re_data.length)*200;
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


function newsListNext(){ 
	deviceone.print("newsListNext");
	invoke.InvokeEDUGet1(nextpage,function(data) {
		deviceone.print("newsListNext get data");
        if(data.results) {
        	nextpage = data.next;
            var re_data = data.results;
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
	})
}
