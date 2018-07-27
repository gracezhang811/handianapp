var app = sm("do_App");
var page = sm("do_Page");
var nf = sm("do_Notification");
var diag = sm("do_Dialog");
var leshi_play = sm("M0078_LePlayerLive");
var con = require("const");

var codetype = diag.getData().codetype;
var minor_activity_id = diag.getData().minor_activity_id;
var activity_id = diag.getData().activity_id;
var video_unique = diag.getData().video_unique;
var minor_video_unique = diag.getData().minor_video_unique;
var payer_name = diag.getData().payer_name;



ui("btn_teacher").on("touch", function(){
	deviceone.print("play teacher video");
	if(codetype == 0){
		if(minor_activity_id){
			deviceone.print("start play live");
			leshi_play.connActionLive({id:minor_activity_id});								
		}else{
			nf.alert("该课时当前没有开始直播!");
		}		
	}else{
		if(minor_video_unique){
			deviceone.print("start play video");
			leshi_play.playByID({uuid:con.LESHI_UUID, vuid:minor_video_unique, payerName:payer_name});							
		}else{
			nf.alert("该课时当前没有回放!");
		}
	}

});

ui("btn_ppt").on("touch", function(){
	deviceone.print("play ppt video");
	if(codetype == 0){
		if(activity_id){
			deviceone.print("start play live");
			leshi_play.connActionLive({id:activity_id});								
		}else{
			nf.alert("该课时当前没有开始直播!");
		}		
	}else{
		if(video_unique){
			deviceone.print("start play replay video");
			leshi_play.playByID({uuid:con.LESHI_UUID, vuid:video_unique, payerName:payer_name});							
		}else{
			nf.alert("该课时当前没有回放!");
		}	
	}

});

ui("img_close").on("touch", function(){
	diag.close();
});
