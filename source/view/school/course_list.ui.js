var app = sm("do_App");
var nf = sm("do_Notification");
var page = sm("do_Page");
var edu = require("education")
var httpinvoke = require("httpinvoke");

var courselistdata = mm("do_ListData");
var list_course = ui("list_course");
var seg_sub_sort = ui("seg_sub_sort")
var seg_data = mm("do_ListData");

var category_id = page.getData().category_id;
var category_name = page.getData().category_name;

var pagenum = 1;
var nextpageurl;
var currentsortid = category_id;

seg_sub_sort.bindItems(seg_data);


page.on("back", function(){ app.closePage() });

ui("lay_goback").on("touch", function () {
	app.closePage();
});

list_course.bindItems(courselistdata);

ui("lab_courselist_name").text = category_name;


edu.CourseSubSort(category_id, function(data){
	var i = 0;
	var newdata = data.results;
	while(newdata[i]){
		if(i == 0){
			newdata[i]["selected"] = 1;
		}else{
			newdata[i]["selected"] = 0;
		}	
		i++;
	}	
	seg_data.addData(newdata);
	seg_sub_sort.refreshItems();
	deviceone.print("first sub sort id = " + newdata[0].id);
	currentsortid = newdata[0].id;
	ShowCourseList(newdata[0].id);
})


page.on("seg_touch", function(data) {
	deviceone.print("recv---" + data.id);
	page.fire("segtouched", data.id);
	currentsortid = data.id;
	courselistdata.removeAll();
	list_course.refreshItems();
	ShowCourseList(data.id);		
})


function RebuildCourseData(data){
	var i = 0;
	while(data[i]){
		if(data[i].is_free == true){
			data[i]["showprice"] = "免费";
			data[i]["pricecolor"] = "8ED93CFF";
		}else{
			//data[i]["showprice"] = "￥"+data[i].price;
			data[i]["showprice"] = data[i].score_exchange + "积分";
			data[i]["pricecolor"] = "D54343FF";
		}
		if(data[i].small_cover_url){
			data[i]["showimage"] = encodeURI(data[i].small_cover_url);
		}else{
			data[i]["showimage"] = "source://image/default_course.png";
		}
		if(data[i].live == true){
			data[i]["showlive"] = true;
		}else{
			data[i]["showlive"] = false;
		}		
		i++;
	}
}

function ShowCourseList(category_id){
	edu.CourseList(category_id, function(data){	
		deviceone.print("show course list");
		nextpageurl = data.next;
		if(data.results){
			RebuildCourseData(data.results);
			courselistdata.addData(data.results);			
		}
		list_course.refreshItems();
	});
}

function CourseListNext(){ 
	httpinvoke.InvokeEDUGet1(nextpageurl,function(data) {
		nextpageurl = data.next;
		if(data.results){
			RebuildCourseData(data.results);
			courselistdata.addData(data.results);			
		}
		list_course.refreshItems(); 
	})
}

//下拉到一定位置松手开始刷新数据
list_course.on("pull", function(data) {
    if (data.state == 2) {// 下拉到一定位置松手开始刷新数据
    	courselistdata.removeAll();
    	list_course.refreshItems();
    	ShowCourseList(currentsortid);    	
    	list_course.rebound();
    }
});

//上拉显示下一页数据
list_course.on("push", function(data) {
    if (data.state == 2) {      	
    	if(nextpageurl){
    		CourseListNext();
    	}else{
			nf.toast("数据已加载完！");
		}
    	list_course.rebound();
    }
});

