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
ShowMingciDetail(id);



function ShowMingciDetail(mingci_id){
	 account.MingciDetail(mingci_id, token, function(data) {
		 ui("web_detail").loadString(data.data.introduction);
	})
	
}
