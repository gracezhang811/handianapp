/**
 * related to search_template.ui
 * 
 * @Author : null
 * @Timestamp : 2017-08-14
 */
var page= sm("do_Page");
var app = sm ("do_App");
var do_product_img= ui("do_product_img");
var do_search_tit= ui ("do_search_tit");

var root = ui("$");

root.setMapping({
	"do_product_img.source":"image",
	"do_search_tit.text":"title",
	"do_search_tit.tag":"id"
})


ui("lay_medicine").on("touch", function(){
	var id = do_search_tit.tag;
	app.openPage({
		source: "source://view/product/literature/literature.ui",
		data:{
			"id": id,
		},
		statusBarState : "transparent"
	});
})
