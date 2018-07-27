var deviceone = require("deviceone");
var nf = deviceone.sm("do_Notification");
var app = deviceone.sm ("do_App");
var con = require ("const");
var httpinvoke = require("httpinvoke");


function LogIn(user ,password,callback){
	var para = {"phone": user ,"password": password}
	httpinvoke.InvokePost(con.Login,para,function(data){
		callback(data);
	})
}
//产品列表
function Product(url,token,callback){
	httpinvoke.InvokeGet(url, token, function(data) {
		callback(data);
	})
}

//详细
function ProDetail(id,token,callback){
	httpinvoke.InvokeGet(con.detail+"?id="+id, token, function(data) {
		callback(data);
	})
}
//点评
function Comment(url,id,token,callback){
	httpinvoke.InvokeGet(url+"?id="+id, token, function(data) {
	callback(data);
})
}

//文献
function Literature(url,id,token,callback){
	httpinvoke.InvokeGet(url+"?id="+id, token, function(data) {
	callback(data);
})
}

//健康自测
function SelfTesting(token,callback){
	httpinvoke.InvokeGet(con.selftesting, token, function(data) {
		callback(data);
	})
}
//search搜索
function Sear_ch(keyword,token,callback){
	httpinvoke.SearchPost(con.search,keyword, token, function(data) {
		callback(data)
	})
}

//药品搜索
function Search_Medicine(keyword,token,callback){
	var para = {
			"pstype": 1,
			"pskeyword": keyword			
	}
	httpinvoke.InvokePostWithToken(con.searchmedicine,para, token, function(data) {
		callback(data)
	})
}

//适应症搜索
function Search_Indication(keyword,token,callback){
	var para = {
			"pstype": 2,
			"pskeyword": keyword			
	}
	httpinvoke.InvokePostWithToken(con.searchmedicine,para, token, function(data) {
		callback(data)
	})
}

//热搜
function Search_Hot(token,callback){
	var para = {
			"pstype": 3,		
	}
	httpinvoke.InvokePostWithToken(con.searchmedicine,para, token, function(data) {
		callback(data)
	})
}

function SearchYaocao(name, token,callback){
	var para = {
			"name": name,		
	}
	httpinvoke.InvokePostWithToken(con.searchyaocao,para, token, function(data) {
		callback(data)
	})
}

function YaocaoDetail(id,token,callback){
	var url = con.yaocaodetail + "?id=" + id;
	httpinvoke.InvokeGet(url, token, function(data) {
		callback(data);
	})
}

function SearchYaocaoSort(cate,token,callback){
	var url = con.searchyaocaowithpinyin + "?cate=" + cate;
	httpinvoke.InvokeGet(url, token, function(data) {
		callback(data);
	})
}

function GetVersion(token,callback){
	var url = con.newversion;
	httpinvoke.InvokeGet(url, token, function(data) {
		callback(data);
	})
}

function LinkHandian(url,callback){
	httpinvoke.HandianLink(url, function(data) {
		callback(data);
	})
}

function GetWanfangPaperList(pagenum,token,callback){
	var para = {"pageNo":pagenum};
	httpinvoke.InvokePostWithToken(con.wanfangpaperlist,para, token, function(data) {
		callback(data)
	})
}

function GetWanfangPaperSearchList(title,pagenum,token,callback){
	var para = {
			"title":title,
			"pageNo":pagenum
	};
	httpinvoke.InvokePostWithToken(con.wanfangpaperlist,para, token, function(data) {
		callback(data)
	})
}


function GetWanfangPaperDetail(id, type, token,callback){
	var url = con.wanfangpaperdetail + "?articleId=" + id + "&typ=" + type;
	deviceone.print("wangang paper url = " + url);
	httpinvoke.InvokeGet(url, token, function(data) {
		callback(data)
	})
}

function GetWanfangPaperDownload(id, type, token,callback){
	var url = con.wanfangpaperdownload + "?articleId=" + id + "&typ=" + type;
	deviceone.print("wangang paper download info url = " + url);
	httpinvoke.InvokeGet(url, token, function(data) {
		callback(data);
	})
}

function CheckUserStatus(phone, token,callback){
	var url = con.checkuserstatus + "?phone=" + phone ;
	httpinvoke.InvokeGet(url, token, function(data) {
		callback(data)
	})
}


function SearchMingci(name, token,callback){
	var para = {
			"name": name,		
	}
	httpinvoke.InvokePostWithToken(con.searchmingci,para, token, function(data) {
		callback(data)
	})
}

function MingciDetail(id,token,callback){
	var url = con.mingcidetail + "?id=" + id;
	httpinvoke.InvokeGet(url, token, function(data) {
		callback(data);
	})
}

function SearchMingciSort(cate,token,callback){
	var url = con.searchmingciwithpinyin + "?cate=" + cate;
	httpinvoke.InvokeGet(url, token, function(data) {
		callback(data);
	})
}

module.exports.LogIn = LogIn;
module.exports.Product = Product;
module.exports.ProDetail = ProDetail;
module.exports.Comment = Comment;
module.exports.Literature = Literature;
module.exports.SelfTesting = SelfTesting;
module.exports.Sear_ch = Sear_ch;
module.exports.Search_Medicine = Search_Medicine;
module.exports.Search_Indication = Search_Indication;
module.exports.Search_Hot = Search_Hot;
module.exports.SearchYaocao = SearchYaocao;
module.exports.YaocaoDetail = YaocaoDetail;
module.exports.SearchYaocaoSort = SearchYaocaoSort;
module.exports.GetVersion = GetVersion;
module.exports.LinkHandian = LinkHandian;
module.exports.GetWanfangPaperList = GetWanfangPaperList;
module.exports.GetWanfangPaperSearchList = GetWanfangPaperSearchList;
module.exports.GetWanfangPaperDetail = GetWanfangPaperDetail;
module.exports.GetWanfangPaperDownload = GetWanfangPaperDownload;
module.exports.CheckUserStatus = CheckUserStatus;
module.exports.SearchMingci = SearchMingci;
module.exports.MingciDetail = MingciDetail;
module.exports.SearchMingciSort = SearchMingciSort;
