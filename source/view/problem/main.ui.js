/**
 * related to main.ui
 * 
 * @Author : √流浪者
 * @Timestamp : 2017-07-19
 */
var page = sm("do_Page");
var nf = sm("do_Notification");
var UM = sm("do_UMengAnalytics");
var app = sm ("do_App");
var root = ui("$");
var wholechatting = "";
var listdataQA = mm ("do_ListData");
var do_LinearLayout_1 = ui ("do_LinearLayout_1");
var iFlayVoice = sm("do_iFlyVoice"); 

var con = require("const");
/*
var device = sm("do_Device");

var deviceinfo = device.getInfo();

deviceone.print("system name:" + deviceinfo.OS);
if(deviceinfo.OS == "Android"){	
	var fixer = mm("M2251_AndroidKeyBoardFix");
	fixer.fix() 	
}
*/
do_LinearLayout_1.redraw();

var do_Label_4= ui("do_Label_4");
do_Label_4.text="汉典医问"

var do_ALayout_11 = ui ("do_ALayout_11");
do_ALayout_11.on("touch",function(){
	app.closePage();
})
page.on("back",function(){
	app.closePage();
})

page.on("resume", function(data, e) {
	UM.beginPageLog({pageName:"page_yiwen"});
	deviceone.print("--umeng + page_yiwen" );
});


var listviewQA = ui ("do_ListView_cent");
var do_send = ui ("do_send");
var btn_voice = ui("btn_voice");
var do_Text_body = ui ("do_Text_body");

btn_voice.on("touch", function(data, e) {
	// 打开语音识别界面
	iFlayVoice.open(function(data, e) {
		if (data != null) {
			// 语音识别过后的文本结果
			do_Text_body.text = do_Text_body.text + data.result;
			// 语音识别过后的拼音结果
			// textBox.text = data.spell;
		}
	});
})

//设置按下颜色
btn_voice.on("touchDown", function(data, e) {
	btn_voice.bgColor = "FFE2E2E2";
})

//恢复初始颜色
btn_voice.on("touchUp", function(data, e) {
	btn_voice.bgColor = "FFFFFFFF";
})
	
do_send.on("touch", function() {
		var http = mm("do_Http");

	    http.method = "POST";
	    http.timeout = 30000;
	    http.contentType = "application/json";
	    http.url = con.tulingapiurl;
	    var outstring = "{\"key\":\""+con.tulingapikey+
	    			"\",\"userid\":\""+con.tulinguserid+
	    			"\",\"info\":\""+do_Text_body.text+"\"}";
	    http.body = outstring;
	    
	    deviceone.print(http.url + " para:" + http.body);
	    
	    http.on("success", function(data){ 
	    	var question = do_Text_body.text;
	    	
	    	//先将外部api接口返回的json字符串打印到UI界面上
	    	var re_json = JSON.stringify(data);
	        deviceone.print("success " + re_json);
	        //然后解析外部api接口返回的json字符串
	        var re_data = JSON.parse(re_json);        
	        if (re_data.code) {//如果返回值存在，进一步解析出返回代码与文本内容
	        	var code = re_data.code;
	            var text = re_data.text;
	            deviceone.print("parse: " + code + ","+text);
	            
	            if (code=="100000"){//如果是文本类，直接将内容输出到对应的模板
	            	//var sendMsg = "<p align=\"right\"><font color=\"#80C0FF\">"+question+"</font></p>";
	            	var sendMsg = question;
	            	var recvMsg = "<p align=\"left\"><font color=\"#000000\" >"+text+"</font></p>";
	            	
	            	if (text.indexOf("url")>=0) {
	            		var link = text.substr(text.indexOf("url")+4,text.length-2);
	                	var parsedtext = text.substring(0, text.indexOf("url")-1);
	            		
	            		deviceone.print("url:"+link);
	            		recvMsg = "<p align=\"left\"><font color=\"#000000\" >"+parsedtext+"</font>"+
	                	": <a href='#"+link+"' id='test'>"+link+"</a></p>";
	            		
	            	}else{
	            		recvMsg = "<p align=\"left\"><font color=\"#000000\" >"+text+"</font></p>";
	            	}
	            	
	            	deviceone.print("Tuling return code 10000");
	            }else if (code=="200000"){//如果是链接类，也将内容输出到对应的模板，需要增加特别的解析前缀
	            	var link = re_data.url;
	            	//var sendMsg = "<p align=\"right\"><font color=\"#80C0FF\">"+question+"</font></p>";
	            	var sendMsg = question;
	            	var recvMsg = "<p align=\"left\"><font color=\"#000000\" >"+text+"</font>"+
	            	": <a href='#"+link+"' id='test'>"+link+"</a></p>";
	            	
	            	deviceone.print("Tuling return code 20000");
	            }else if (code=="302000"){//如果是新闻类，按照上面的处理参考进行
	            	var link = re_data.url;
	            	//var sendMsg = "<p align=\"right\"><font color=\"#80C0FF\">"+question+"</font></p>";
	            	var sendMsg = question;
	            	var recvMsg = "<p align=\"left\"><font color=\"#000000\" >"+text+"</font>"+
	            	": <a href='#"+link+"' id='test'>"+link+"</a></p>";
	            	
	            	deviceone.print("Tuling return code 20000");
	            }else {//自行处理其它额外情况
	            	//var sendMsg = "<p align=\"right\"><font color=\"#80C0FF\">"+question+"</font></p>";
	            	var sendMsg = question;
	            	var recvMsg = "<p align=\"left\"><font color=\"#000000\" >抱歉，我还不够聪明哦！</font></p>"
	            }
	            wholechatting = wholechatting +"<br>"+sendMsg+recvMsg;
	        	deviceone.print("wholechatting: " + wholechatting);
	            
	        	//给ListData增加数据，注意永远插入到最前面，这样显示也就在前面
	        	/*listdataQA.addOne({"template":0,"recvMsg":recvMsg},0);
	            listdataQA.addOne({"template":1,"sendMsg":sendMsg},0);*/
	            //index为空，则插入到最后
	        	listdataQA.addOne({"template":0,"sendMsg":sendMsg});
	        	listdataQA.addOne({"template":1,"recvMsg":recvMsg});
	            
	            
	        	//将增加的数据绑定到ListView组件上
	            listviewQA.bindItems(listdataQA);            
	            
	            //刷新组件，显示新增的内容
	            listviewQA.refreshItems(); 
	            
	            var lenindex = listdataQA.getCount();
	            listviewQA.scrollToPosition(lenindex,true);
	            do_Text_body.text="";
	        }        
	        
	    });
	    http.on("fail", function(data){
	        deviceone.print("fail " + JSON.stringify(data)); 
	    });
	    
	    http.request();
	});