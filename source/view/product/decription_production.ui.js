
var app = sm ("do_App");
var nf = sm ("do_Notification");
var page = sm ("do_Page");
var root = ui("$");
var do_ALay_banner = ui("do_ALay_banner");
var id = page.getData().id;
var title = page.getData().title;

var datacache = sm ("do_DataCache");

var zufangdata = mm("do_ListData");
var questiondata = mm("do_ListData");
var commentdata = mm("do_ListData");

var list_zufang = ui("list_zufang");
var list_ques = ui("list_ques");
var list_comment = ui("list_comment");

var do_ALayout_back = ui ("do_ALayout_back");
do_ALayout_back.on("touch",function(){
	app.closePage();
})
page.on("back",function(){
	app.closePage();
})

//title和banner大图
var do_Label_title = ui("do_Label_title");
do_Label_title.text = title;


//获取产品信息
var con = require("const");
var account = require("account")
var token = datacache.loadData("PublicLogin");

//产品说明
account.ProDetail(id,token,function(data){
	var introduction = data["data"]["product"]["content"];
	ui("img_product").source = data["data"]["product"]["image"];
	ui("web_intro").loadString(introduction);
	
});

var seg_content = ui("seg_content");
var segdata = mm("do_ListData");

var seg_list = [{
	"title":"产品说明",
	"selected": 1,
	"id": 0,
},{
	"title":"常见问题",
	"selected": 0,
	"id": 2,
},{
	"title":"专家点评",
	"selected": 0,
	"id": 3,
}]

segdata.addData(seg_list);
seg_content.bindItems(segdata)
seg_content.refreshItems();

var lay_desc_detail = ui("lay_desc_detail");
var lay_zufang = ui("lay_zufang");
var lay_ques = ui("lay_ques");
var lay_comment = ui("lay_comment");

list_zufang.bindItems(zufangdata);
list_ques.bindItems(questiondata);
list_comment.bindItems(commentdata);

function ShowIntro(){
	lay_desc_detail.visible = true;
	lay_zufang.visible = false;
	lay_ques.visible = false;
	lay_comment.visible = false;	
}

function ShowZufang(){
	lay_desc_detail.visible = false;
	lay_zufang.visible = true;
	lay_ques.visible = false;
	lay_comment.visible = false;	
	
	zufangdata.removeAll();
	list_zufang.refreshItems();
	account.Comment(con.literature, id, token, function(data) {
		var data_list = data["data"]["literature"];
		zufangdata.addData(data_list);		
		list_zufang.refreshItems();
	});
}

function ShowQues(){
	lay_desc_detail.visible = false;
	lay_zufang.visible = false;
	lay_ques.visible = true;
	lay_comment.visible = false;	

	questiondata.removeAll();
	list_ques.refreshItems();
	account.Comment(con.problem, id, token, function(data) {
		var data_list = data["data"]["productQuestions"];
		deviceone.print(JSON.stringify(data_list));
		for(var i = 0;i<data_list.length;i++){
			data_list[i]["questionid"]= "问题"+(i+1);
			data_list[i]["question"]=data_list[i]["question"];
			data_list[i]["answer"] = data_list[i]["answer"]
		}
		questiondata.addData(data_list);
		deviceone.print(JSON.stringify(data_list))		
		list_ques.refreshItems();
	});
}

function ShowComment(){
	lay_desc_detail.visible = false;
	lay_zufang.visible = false;
	lay_ques.visible = false;
	lay_comment.visible = true;	

	commentdata.removeAll();		
	list_comment.refreshItems();
	account.Comment(con.comment, id, token, function(data) {
		var data_list = data["data"]["productComments"];
		commentdata.addData(data_list);		
		list_comment.refreshItems();
	});

}

page.on("seg_touch", function(data) {
	deviceone.print("recv---" + data.id);
	if(data.id == 0){
		page.fire("segtouched", 0);
		ShowIntro();
	}else if(data.id == 2){
		page.fire("segtouched", 2);
		ShowQues();
	}else if(data.id == 3){
		page.fire("segtouched", 3);
		ShowComment();
	}
		
})
