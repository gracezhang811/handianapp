/**
 * New DeviceOne File
 */
var deviceone= require("deviceone");
var nf = deviceone.sm("do_Notification");
var page = deviceone.sm("do_Page");

function InvokePost(url,para,callback){
	var con = require("const");
	var http = deviceone.mm("do_Http");
	
	http.method="POST";
	http.timeout=30000;
	http.contentType = "application/json";
	http.url = con.URL + url ;
	http.body = para

	http.on("success",function(data){
		deviceone.print("success-------"+JSON.stringify(data));
		callback(data);
	})
	http.on("fail",function(data){
		deviceone.print("fail-------"+JSON.stringify(data));
		callback(data);
	})
	http.request();
}

function InvokeGet(url,token,callback){
	var con = require("const");
	var http = deviceone.mm ("do_Http");
	http.method="GET";
	http.timeout=30000;
	http.contentType="application/json";
	http.url = con.URL+url;
	
	//http.setRequestHeader("token", token)
	http.on("success",function(data){
		deviceone.print("success-------"+JSON.stringify(data));
		callback(data);
	})
	http.on("fail",function(data){
		deviceone.print("fail-------"+JSON.stringify(data));
		callback(data);
	})
	http.request();
}

function InvokePostWithToken(url,para,token,callback){
	var con = require("const");
	var http = deviceone.mm("do_Http");
	
	http.method="POST";
	http.timeout=30000;
	http.contentType = "application/json";
	http.url = con.URL + url ;
	http.body = para
	//http.setRequestHeader("token", token)
	deviceone.print("url = " + http.url);
	deviceone.print("para = " + JSON.stringify(para));
	http.on("success",function(data){
		deviceone.print("success-------"+JSON.stringify(data));
		callback(data);
	})
	http.on("fail",function(data){
		deviceone.print("fail-------"+JSON.stringify(data));
		callback(data);
	})
	http.request();
}
//搜索信息
function SearchPost(url,keyword,token,callback){
	var con = require("const");
	var http = deviceone.mm("do_Http");
	http.method = "POST";
	http.timeout = 30000 ; 
	http.contentType = "application/json";
	http.url = con.URL + url;
	http.body = {"gskeyword":keyword}
	//http.setRequestHeader("token", token)
	http.on("success",function(data){
		deviceone.print("success-------"+JSON.stringify(data));
		callback(data);
	})
	http.on("fail",function(data){
		deviceone.print("fail------"+Json.stringify(data));
		callback(data)
	})
	http.request();
}


function InvokeDownload(url,token,path,callback){
	var con = require("const");
	var http = deviceone.mm ("do_Http");
	http.method="GET";
	http.timeout=30000;
	//http.contentType="application/json";
	http.url = url;
	deviceone.print("url="+ http.url);
	
	http.on("success",function(data){
		deviceone.print("return-----");
		callback(data);
	})
	http.on("fail",function(data){
		deviceone.print("fail------"+JSON.stringify(data));
		nf.alert("文献下载失败！");
	})
	http.download(path);
}


function GetTokenWithoutLogin( callback){
    var http = deviceone.mm("do_Http", "http_id2", "app");
    var con = require("const");
    var form_para = {
        "texts": [
                  {"key": "Authorization", "value": 'Basic ' + (con.Client_Id + ':' + con.Client_Secret).toString('base64')},
                  {"key": "client_id", "value": con.Client_Id},
                  {"key": "client_secret", "value": con.Client_Secret},
                  {"key": "grant_type", "value": 'client_credentials'},
                  ],
    }
    http.method = "POST";
    http.timeout = 30000;
    http.contentType = "multipart/form-data";
    http.url =  con.EDUURL + con.EDULogin;
    //这里有一个特别的地方，form方法默认已经发出request请求了，所以后面的http.request方法要去掉
    http.form(form_para);
    
    deviceone.print(http.url + " para:" + JSON.stringify(form_para));
    
    http.on("success", function(data){
        deviceone.print("success " + JSON.stringify(data));
        callback(data);
    });
    http.on("fail", function(data){
        //网络问题或者请求超时
        deviceone.print("fail--- "+JSON.stringify(data));
        callback({"status": false, "message": "账号错误或网络问题"});
    });
}

function FormPost(url, form_para, callback){
    //此方法专为获取token而写，因后台此接口只接受form表单提交的请求
    var con = require("const");
    var http = deviceone.mm("do_Http");
    
    http.method = "POST";
    http.timeout = 30000;
    http.contentType = "multipart/form-data";
    http.url =  con.EDUURL + url;

    //这里有一个特别的地方，form方法默认已经发出request请求了，所以后面的http.request方法要去掉
    http.form(form_para);
    deviceone.print(http.url + JSON.stringify(form_para));
    
    http.on("success", function(data){
        deviceone.print("success " + JSON.stringify(data));
        callback(data);
    });
    http.on("fail", function(data){
        //网络问题或者请求超时
        deviceone.print("fail--- " + JSON.stringify(data));
        callback(data);
    });
}

function FormPostWithToken(url, form_para, callback){
    var con = require("const");
    var http = deviceone.mm("do_Http");
    var data_cache = deviceone.sm("do_DataCache");
    var token = data_cache.loadData(con.CK_EDU_TOKEN);
    
    http.method = "POST";
    http.timeout = 30000;
    http.contentType = "multipart/form-data";
    http.url =  con.EDUURL + url;

    http.setRequestHeader("Authorization", "Bearer " + token);
    
    //这里有一个特别的地方，form方法默认已经发出request请求了，所以后面的http.request方法要去掉
    http.form(form_para);
    
    deviceone.print(http.url + JSON.stringify(form_para));
    
    http.on("result", function(data){
        deviceone.print("success " + JSON.stringify(data));
        callback(data);
    });
}


function InvokeEDUPost(url, para, callback){
    var con = require("const");
    var http = deviceone.mm("do_Http");
    var data_cache = deviceone.sm("do_DataCache");
    var token = data_cache.loadData(con.CK_EDU_TOKEN);

    http.method = "POST";
    http.timeout = 30000;
    http.contentType = "application/json";
    http.url =  con.EDUURL + url;
    http.body = para;
    
    if (!token){
        callback({"status": false, "message": "重新登陆"});
        return
    }else{
        http.setRequestHeader("Authorization", "Bearer " + token);
    }
    deviceone.print(" token:" + token);
    deviceone.print(http.url + " para:" + http.body);
    
    http.on("success", function(data){
        deviceone.print("success " + JSON.stringify(data));
        callback(data);
    });
    http.on("fail", function(data){
        deviceone.print("fail " + JSON.stringify(data)); 
        callback(data);   	
    });
    
    http.request();
}

function InvokeEDUPost1(url, para, callback){
    var con = require("const");
    var http = deviceone.mm("do_Http");
    var data_cache = deviceone.sm("do_DataCache");
    var token = data_cache.loadData(con.CK_EDU_TOKEN);

    http.method = "POST";
    http.timeout = 30000;
    http.contentType = "application/json";
    http.url =  con.EDUURL + url;
    http.body = para;
    
    if (!token){
        callback({"status": false, "message": "重新登陆"});
        return
    }else{
        http.setRequestHeader("Authorization", "Bearer " + token);
    }
    deviceone.print(" token:" + token);
    deviceone.print(http.url + " para:" + http.body);
    
    http.on("result", function(data){
        deviceone.print("success " + JSON.stringify(data));
        callback(data);
    });
    
    http.request();
}

function DateFormat(dataStr)
{
    var   now = new Date(dataStr);
    var   year=now.getFullYear();
    var   month=now.getMonth()+1;
    var   date=now.getDate();
    var   hour=now.getHours();
    var   minute=now.getMinutes();
    var   second=now.getSeconds();
    //deviceone.print("------new hour = " + hour);
    if(month<10){
        month = '0'+month;
    }
    if(date<10){
        date = '0'+date;
    }
    if(hour<10){
        hour = '0'+hour;
    }
    if(minute<10){
        minute = '0'+minute;
    }
    if(second<10){
        second = '0'+second;
    }
    var format_date = year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;
    //deviceone.print("------new data = " + format_date);
    return format_date;
}


function InvokeEDUGet(para,callback){
    var con = require("const");
    var http = deviceone.mm("do_Http");
    var nf = deviceone.sm("do_Notification");
    var data_cache = deviceone.sm("do_DataCache");
    var token = data_cache.loadData(con.CK_EDU_TOKEN);
    var ref_token = data_cache.loadData(con.CK_REFRESH_TOKEN);

    http.method = "GET";
    http.timeout = 30000;
    http.contentType = "application/json";
    http.url =  con.EDUURL + para;
    deviceone.print("请求参数"+http.url);
    
    deviceone.print("token: "+ token);
    
    if (!token){
        callback({"status": false, "message": "重新登陆"});
        return
    }else{
        http.setRequestHeader("Authorization", "Bearer " + token);
    }
        
    http.on("success", function(data){
        deviceone.print("success " + JSON.stringify(data));
        callback(data);
    });
    http.on("fail", function(data){
        deviceone.print("fail " + JSON.stringify(data)); 
        callback({"status": false, "message": "获取失败"});
    });
    
    http.request();
}

function InvokeEDUGet1(para,callback){
    var con = require("const");
    var http = deviceone.mm("do_Http");
    var nf = deviceone.sm("do_Notification");
    var data_cache = deviceone.sm("do_DataCache");
    var token = data_cache.loadData(con.CK_EDU_TOKEN);
    var ref_token = data_cache.loadData(con.CK_REFRESH_TOKEN);

    http.method = "GET";
    http.timeout = 30000;
    http.contentType = "application/json";
    http.url = para;
    deviceone.print("请求参数"+http.url);
    
    if (!token){
        callback({"status": false, "message": "重新登陆"});
    }else{
        http.setRequestHeader("Authorization", "Bearer " + token);
    }
        
    http.request();
    
    http.on("success", function(data){
        deviceone.print("success " + JSON.stringify(data));
        callback(data);
    });
    http.on("fail", function(data){
        deviceone.print("fail " + JSON.stringify(data)); 
        callback(data);
    });
    
    
}

function Format(str, argArray) {
    if (typeof argArray !== "object") {
        return str;
    }
    
    for (var i = 0; i < argArray.length; i++) {
        str = str.replace("{" + i +"}", argArray[i]);
    }
    return str;
}


function HandianLink(url, callback){
    var con = require("const");
    var http = deviceone.mm("do_Http");
    var nf = deviceone.sm("do_Notification");

    http.method = "GET";
    http.timeout = 30000;
    http.contentType = "application/json";
    http.url = url;
    deviceone.print("请求参数"+http.url);
        
    http.request();
    
    http.on("success", function(data){
        deviceone.print("success to link handian" );
        callback(data);
    });
    http.on("fail", function(data){
        deviceone.print("fail to link handian"); 
        callback(data);
    });
    
    
}

module.exports.HandianLink= HandianLink;
module.exports.InvokePost= InvokePost;
module.exports.InvokeGet = InvokeGet;
module.exports.InvokeDownload = InvokeDownload;
module.exports.SearchPost = SearchPost;
module.exports.InvokePostWithToken = InvokePostWithToken;
//module.exports.FromPara = FromPara;
module.exports.GetTokenWithoutLogin = GetTokenWithoutLogin;
module.exports.FormPost = FormPost;
module.exports.FormPostWithToken = FormPostWithToken;
module.exports.InvokeEDUPost = InvokeEDUPost;
module.exports.DateFormat = DateFormat;
module.exports.InvokeEDUGet = InvokeEDUGet;
module.exports.InvokeEDUGet1 = InvokeEDUGet1;
module.exports.Format = Format;
module.exports.InvokeEDUPost1 =InvokeEDUPost1;
