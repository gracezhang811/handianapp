
var nf = sm("do_Notification");
var page = sm ("do_Page");
var UM = sm("do_UMengAnalytics");
var root = ui("$");
var edu = require("education")


var do_ListView_school = ui ("do_ListView_school");
var listschool = mm("do_ListData");
var hddxcon = [{
	"template":0,
	"imgbanner":"source://image/school_banner.jpg"
},{
	"template":1,
	"image1":"source://image/school_li00.png",
	"fenlei":"汉典图书馆",
	"title" : "汉典图书馆",
	"flColor":"3e484aFF",
	"sort_id" : 1,
	"content":"汉典图书馆收藏传统经典书籍，弘扬中华优秀传统文化，分享书籍中的智慧。"
	
},{
	"template":1,
	"image1":"source://image/school_li1.jpg",
	"fenlei":"汉典书院",
	"title" : "汉典书院",
	"flColor":"3e484aFF",
	"sort_id" : 0,
	"content":"汉典书院依托中华传统医学博大精深底蕴，传承祖国传统医学精髓，分享中医文化临床经验。"
	
},{
	"template":2,
	"image1":"source://image/school_li2.jpg",
	"fenlei1":"脾胃理论",
	"flColor1":"3e484aFF",
	"sort_id" : 4,
	"body":"人体的生长发育，一切生理活动，全靠脾胃水谷精气的维持，故《内经》有“人受气于谷”和“得谷者昌，失谷者亡”的定论，后世医家李东垣提出 “内伤脾胃，百病由生”的理论。"
},{
	"template":2,
	"image1":"source://image/school_li3.jpg",
	"fenlei1":"骨伤中心",
	"flColor1":"3e484aFF",
	"sort_id" : 3,
	"body":"中医骨伤科学是研究防治人体皮肉、筋骨、气血、脏腑经络损伤与疾患的一门科学。在古代属'折疡'、'金镞'等范畴。历史上本科有'金疡'、'接骨'、'正骨'、'伤科'等不同称谓。"
},{
	"template":2,
	"image1":"source://image/school_li4.jpg",
	"fenlei1":"肝病中心",
	"flColor1":"3e484aFF",
	"sort_id" : 18,
	"body":"肝病科，是一个与许多科室交叉的学科，如感染科、消化内科、肝胆外科、普外科，其诊疗内容内、外兼顾，涉及范围较广。"
},{
	"template":2,
	"image1":"source://image/school_li5.jpg",
	"fenlei1":"心肺中心",
	"flColor1":"3e484aFF",
	"sort_id" : 19,
	"body":"以心、肺血管相关疾病防治的基础和临床研究为主要方向，瞄准国际发展前沿，紧跟国际发展最新动态，为广大医疗工作者提供一个学习心、肺血管疾病防治知识及合理用药的平台。"
}]

edu.CourseSort(function(data){
	if(data.status == 401){
		edu.GetNewToken();
	}
})

listschool.addData(hddxcon);
do_ListView_school.bindItems(listschool);
do_ListView_school.refreshItems();