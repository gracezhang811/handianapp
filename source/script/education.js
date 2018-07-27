var deviceone = require("deviceone");
var nf = deviceone.sm("do_Notification");
var app = deviceone.sm ("do_App");
var data_cache = deviceone.sm("do_DataCache");

var con = require ("const");
var httpinvoke = require("httpinvoke");


function LogIn(val, password, callback){
    var form_para = {
        "texts": [
              {"key": "username", "value": val},
              {"key": "password", "value": password},
              {"key": "client_id", "value": con.Client_Id},
              {"key": "client_secret", "value": con.Client_Secret},
              {"key": "grant_type", "value": "password"},
        ],
    }
    httpinvoke.FormPost(con.EDULogin, form_para, function(data){
        callback(data);
    });
}


function RefreshToken(callback){
	var access_token = data_cache.loadData(con.CK_EDU_TOKEN);
	var refresh_token = data_cache.loadData(con.CK_REFRESH_TOKEN);
	var para = {
			"texts": [			
	          			{"key": "refresh_token", "value":refresh_token},
	          			{"key": "client_id", "value": con.Client_Id},
	          			{"key": "client_secret", "value": con.Client_Secret},
	          			{"key": "grant_type", "value": "refresh_token"},
			        ],

	};
	httpinvoke.FormPostWithToken(con.EDULogin,para,function(data){
		callback(data);
	})
}

function GetUserInfo(callback){
	httpinvoke.InvokeEDUGet(con.EDUGetUserInfo,function(data) {
		callback(data);
	})
}

function SuggestInfo(callback){
	httpinvoke.InvokeEDUGet(con.EDUSuggestInfo,function(data) {
		callback(data);
	})
}

function InfoList(callback){
	httpinvoke.InvokeEDUGet(con.EDUInfoList,function(data) {
		callback(data);
	})
}

function InfoDetail(id,callback){
	var url = con.EDUInfoDetail + id + "/";
	deviceone.print("infodetail url = " + url);
	httpinvoke.InvokeEDUGet(url, function(data) {
		callback(data);
	})
}

function CourseSort(callback){
	httpinvoke.InvokeEDUGet(con.EDUCourseSort, function(data) {
		callback(data);
	})
}

function CourseSubSort(sort_id, callback){
	var url = con.EDUCourseSubSort + sort_id;
	httpinvoke.InvokeEDUGet(url, function(data) {
		callback(data);
	})
}

function CourseList(category_id, callback){
	var url = con.EDUCourseList + category_id;
	deviceone.print("courselist url = " + url);
	httpinvoke.InvokeEDUGet(url, function(data) {
		callback(data);
	})
}

function CourseDetail(course_id, callback){
	var url = con.EDUCourseDetail + course_id + "/?with_joined=1";
	deviceone.print("course detail url = " + url);
	httpinvoke.InvokeEDUGet(url, function(data) {
		callback(data);
	})
}

function CoursePeriodList(page_num, course_id, callback){
	var url = con.EDUCoursePeriodList + course_id + "&page=" + page_num;
	deviceone.print("course period list url = " + url);
	httpinvoke.InvokeEDUGet(url, function(data) {
		callback(data);
	})
}

function CourseLiveList(course_id,page_num, callback){
	var url = httpinvoke.Format(con.EDUCourseLiveList, [course_id,page_num]);
	deviceone.print("course live period list url = " + url);
	httpinvoke.InvokeEDUGet(url, function(data) {
		callback(data);
	})
}

function SignUp(para, callback){
	httpinvoke.InvokeEDUPost1(con.EDUSignUp, para, function(data) {
		callback(data);
	})
}

function SignUpNew(para, callback){
	httpinvoke.InvokeEDUPost1(con.EDUSignUpNew, para, function(data) {
		callback(data);
	})
}

function JoinedCourseList(user_id, callback){
	var url = con.EDUGetJoinedCourse + user_id;
	deviceone.print("joined course list url = " + url);
	httpinvoke.InvokeEDUGet(url, function(data) {
		callback(data);
	})
}

function JoinCourse(course_id, callback){
	var url = httpinvoke.Format(con.EDUJoinCourse, [course_id]);
	deviceone.print("join course url = " + url);
	var para = null;
	httpinvoke.InvokeEDUPost(url, para, function(data) {
		callback(data);
	})
}

function BuyCourseByScore(course_id, callback){
	var para = {"gift_id": course_id};
	httpinvoke.InvokeEDUPost1(con.EDUBuyCourseByScore, para, function(data) {
		callback(data);
	})
}


function ResetPwd(para, callback){
	httpinvoke.InvokeEDUPost1(con.EDUResetPwd, para, function(data) {
		callback(data);
	})
}

function SendPhone(para, callback){
	httpinvoke.InvokeEDUPost1(con.EDUSendCode, para, function(data) {
		callback(data);
	})
}

function SendPhoneForReg(para, callback){
	httpinvoke.InvokeEDUPost1(con.EDUSendCodeForReg, para, function(data) {
		callback(data);
	})
}

function GetNewToken(){
	var token = data_cache.loadData(con.CK_EDU_TOKEN);
	var refresh_token = data_cache.loadData(con.CK_REFRESH_TOKEN);
	var is_login = data_cache.loadData(con.CK_IS_LOGIN);
	//refresh_token = "1234";
	deviceone.print("user is  login = " + is_login);
	deviceone.print("refresh_token = " + refresh_token);
	deviceone.print("old token = " + token);
	deviceone.print("token type = " + data_cache.loadData(con.CK_TOKEN_TYPE));
	if(!refresh_token){
		httpinvoke.GetTokenWithoutLogin(function(data){
			deviceone.print("GetTokenWithoutLogin");
			data_cache.saveData(con.CK_EDU_TOKEN, data.access_token);
			data_cache.saveData(con.CK_REFRESH_TOKEN, data.refresh_token);
			data_cache.saveData(con.CK_TOKEN_TYPE, 0);	
			data_cache.saveData(con.CK_IS_LOGIN, 0);	
		});
	}else{
		RefreshToken(function(data){	
			deviceone.print("status= " + data.status);
			if(data.status < 400){
				deviceone.print("RefreshToken success");
				var tokendata = JSON.parse(data.data);
				data_cache.saveData(con.CK_EDU_TOKEN, tokendata.access_token);
				data_cache.saveData(con.CK_REFRESH_TOKEN, tokendata.refresh_token);
				data_cache.saveData(con.CK_TOKEN_TYPE, 1);
				data_cache.saveData(con.CK_IS_LOGIN, 1);
			}else{
				deviceone.print("RefreshToken failed");
				httpinvoke.GetTokenWithoutLogin(function(data){
					deviceone.print("GetTokenWithoutLogin");
					data_cache.saveData(con.CK_EDU_TOKEN, data.access_token);
					data_cache.saveData(con.CK_REFRESH_TOKEN, data.refresh_token);
					data_cache.saveData(con.CK_TOKEN_TYPE, 0);	
					data_cache.saveData(con.CK_IS_LOGIN, 0);	
				});	
			}

		});
	}
}

function LiveCourseList(page_num, callback){
	var url = con.EDULiveCourseList + page_num;
	deviceone.print("courselist url = " + url);
	httpinvoke.InvokeEDUGet(url, function(data) {
		callback(data);
	})
}

module.exports.LogIn = LogIn;
module.exports.SignUp = SignUp;
module.exports.SignUpNew = SignUpNew;
module.exports.ResetPwd = ResetPwd;
module.exports.SendPhone = SendPhone;
module.exports.SendPhoneForReg = SendPhoneForReg;
module.exports.RefreshToken = RefreshToken;
module.exports.SuggestInfo = SuggestInfo;
module.exports.InfoList = InfoList;
module.exports.InfoDetail = InfoDetail;
module.exports.CourseSort = CourseSort;
module.exports.CourseSubSort = CourseSubSort;
module.exports.CourseList = CourseList;
module.exports.CourseDetail = CourseDetail;
module.exports.CoursePeriodList = CoursePeriodList;
module.exports.CourseLiveList = CourseLiveList;
module.exports.GetUserInfo = GetUserInfo;
module.exports.JoinedCourseList = JoinedCourseList;
module.exports.JoinCourse = JoinCourse;
module.exports.BuyCourseByScore = BuyCourseByScore;
module.exports.GetNewToken = GetNewToken;
module.exports.LiveCourseList = LiveCourseList;

