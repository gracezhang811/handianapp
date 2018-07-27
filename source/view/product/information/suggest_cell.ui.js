var app = sm("do_App");
var deviceone = require("deviceone");
var nf = sm("do_Notification");
var edu = require("education");

var slide_cover = ui("cover_carousel");
var carousellistdata = mm("do_ListData");
var covercount = 0;

slide_cover.bindItems(carousellistdata);

newssuggest();

var do_Label_1 = ui ("do_Label_1");
slide_cover.on ("indexChanged",function(index){
	var  i = index+1
	do_Label_1.text = i + "/" + covercount;
})

function newssuggest(){ 
    edu.SuggestInfo(function(data){
        if(data.results.length > 0) {
        	carousellistdata.addData(data.results);
        	slide_cover.refreshItems();
        	covercount = data.count;
        }
    });
};

slide_cover.startLoop(3000);
