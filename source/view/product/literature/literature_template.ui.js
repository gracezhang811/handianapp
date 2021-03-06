/**
 * related to search_template.ui
 * 
 * @Author : null
 * @Timestamp : 2017-08-14
 */
var page= sm("do_Page");
var app = sm ("do_App");
var nf = sm ("do_Notification");
var do_product_img= ui("do_product_img");
var do_literature_tit= ui ("do_literature_tit");

var root = ui("$");

root.setMapping({
		"do_product_img.source":"image",
		"do_product_img.tag":"downloadName",
		"do_literature_tit.text":"title",
		"do_literature_tit.tag":"downloadUrl"
});

ui ("lay_literature_item").on("touch", function(){
	var pdfname = do_product_img.tag;
	var pdfurl = do_literature_tit.tag;
	deviceone.print("pdf url = " + pdfurl);
	if(pdfurl.substr(-4,4) == ".pdf"){
		app.openPage({
			source: "source://view/product/literature/pdfread.ui",
			data:{
				"pdfurl": pdfurl,
				"pdfname": pdfname
			},
			statusBarState : "transparent"
		});
	}else{
		nf.alert("该文献不是pdf格式。");
	}
});