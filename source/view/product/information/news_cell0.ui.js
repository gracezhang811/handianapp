var app = sm("do_App");
var deviceone = require("deviceone");
var nf = sm("do_Notification");
var rootview = ui("$");

rootview.setMapping({
    "img_cover.source": "small_cover_url",
    "title.text" : "title",
    "lay_content.tag":"id",
    "publish_time.text": "publish_at"
});

ui("lay_content").on("touch",function(){
    var news_id = ui("lay_content").tag;
    deviceone.print("news id = " + news_id);
    app.openPage({
        source : "source://view/product/information/info_detail.ui",
        data: {
            "news_id": news_id,
        },
        statusBarState : "transparent",
    });
});