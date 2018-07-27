/**
 * related to main.ui
 * 
 * @Author : √流浪者
 * @Timestamp : 2017-08-16
 */
var page = sm("do_Page");
var app = sm ("do_App");
var UM = sm("do_UMengAnalytics");

var nf = sm ("do_Notification");
var datacache = sm("do_DataCache")
var account = require("account")

var token = datacache.loadData("PublicLogin")

var do_back = ui("do_back");
var do_Seg_nav = ui("do_Seg_nav")
var seg_data = mm("do_ListData");
var slide_assisstent = ui("slide_assisstent");
var slidedata = mm("do_ListData");

do_back.on("touch",function(){
	app.closePage();
	page.hideKeyboard();
})
page.on("back",function(){
	app.closePage();
	page.hideKeyboard();
})

page.on("resume", function(data, e) {
	UM.beginPageLog({pageName:"page_yongyaoshuoming"});
	deviceone.print("--umeng + page_yongyaoshuoming" );
});

var seg_list = [{
	
	"title":"热搜药品",
	"selected":1,
	"id": 0
},{
	"title":"药品",
	"selected":0,
	"id": 1
},{
	"title":"适应症",
	"selected":0,
	"id": 2
}]
seg_data.addData(seg_list);
do_Seg_nav.bindItems(seg_data)
do_Seg_nav.refreshItems();


//定义SlideView的数据
var data_slide = [ {
	template: 1,
}, {
	template : 0,
}, {
	template : 2,
}, ];
 

slide_assisstent.bindItems(slidedata);
slidedata.addData(data_slide);
slide_assisstent.refreshItems();
 
ShowHot();

// 这里没有注册SegmentView的indexChanged事件，在回调中改变SlideView的index，是因为这样在android的好的设备上可能导致死锁
// 所以通过点击一个segmentview的cell，通过page来传递一个自定义的事件
page.on("seg_touch", function(index) {
	slide_assisstent.index = index;
})

function setSegIndex(index) {
    for (var i = 0; i < seg_data.getCount(); i++) {
        var d = seg_data.getOne(i);
        if (i == index) {
            d.selected = 1;
        } else {
            d.selected = 0;
        }
        seg_data.updateOne(i, d);
    }
    do_Seg_nav.refreshItems();
    do_Seg_nav.index = index;
}
// 注册SlideView的indexChanged事件，在回调中改变SegmentView的index，做到两个组件互相联动
slide_assisstent.on("indexChanged", function(index) {
    setSegIndex(index);
	switch(index){
	case 0:
		ShowHot();
		break;
	case 1:
		break;
	case 2:		
		break;
	default:
	}
})

function ShowHot(){
	 account.Search_Hot(token, function(data) {
		page.fire("showhot", data.data.products) 	
	 })
		 
}
