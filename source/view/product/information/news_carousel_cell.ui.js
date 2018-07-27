var app = sm("do_App");
var page = sm("do_Page");
var deviceone = require("deviceone");
var nf = sm("do_Notification");
var rootview = ui("$");

rootview.setMapping({
    "img_carousel.source": "small_cover_url",
    "label_title.text":"title",
    "label_title.tag":"id"
});


ui("lay_content").on("touch",function(){
    var news_id = ui("label_title").tag;
    deviceone.print("news id = " + news_id);
    app.openPage({
        source : "source://view/product/information/info_detail.ui",
        data: {
            "news_id": news_id,
        },
        statusBarState : "transparent",
    });
});