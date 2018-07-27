var app = sm("do_App");
var nf = sm("do_Notification");
var page = sm("do_Page");
var con = require("const");
var account = require("account")

var data_cache = sm("do_DataCache");

var id = page.getData().id;
var name = page.getData().name;

var token = data_cache.loadData("PublicLogin")
var imgnum = 0;

page.on("back", function(){ 
	app.closePage() 
});

ui("lay_goback").on("touch", function () {
    app.closePage();
});

ui("lab_title").text=name;
ShowYaocaoDetail(id);

var slide_cover = ui("slide_cover");
var img_yaocao = ui("img_yaocao");
var coverdata = mm("do_ListData");

slide_cover.bindItems(coverdata);

function ShowYaocaoDetail(yaocao_id){
	 //coverdata.removeAll();
	 account.YaocaoDetail(yaocao_id, token, function(data) {
		 if((data.data.pic1 != null)&&(data.data.pic1 != "")){
			// deviceone.print("---image1 url = " + data.data.pic1);
			 coverdata.addOne({"image":data.data.pic1});
			 imgnum++;
		 }
		 if((data.data.pic2 != null)&&(data.data.pic2 != "")){
			// deviceone.print("---image2 url = " + data.data.pic2);
			 coverdata.addOne({"image":data.data.pic2});
			 imgnum++;
		 }
		 if((data.data.pic3 != null)&&(data.data.pic3 != "")){
			// deviceone.print("---image3 url = " + data.data.pic3);
			 coverdata.addOne({"image":data.data.pic3});
			 imgnum++;
		 }
		 deviceone.print("---image num = " + coverdata.getCount());
		 if(imgnum == 0){
			 img_yaocao.visible = true;
			 slide_cover.visible = false;
			 img_yaocao.source = "source://image/yaocao_img.jpg";
		 }else if(imgnum == 1){
			 img_yaocao.visible = true;
			 slide_cover.visible = false;
			 img_yaocao.source = data.data.pic1;
		 }else if(imgnum > 1){
			 img_yaocao.visible = false;
			 slide_cover.visible = true;
			 slide_cover.refreshItems();
			 slide_cover.startLoop(3000);	
		 }
	 

		 ui("web_detail").loadString(data.data.introduction);
	})
	
}
