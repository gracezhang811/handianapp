/**
 * related to decr_body_con3_templates.ui
 * 
 * @Author : √流浪者
 * @Timestamp : 2017-07-28
 */
var app = sm("do_App");
var page = sm("do_Page");
var nf= sm("do_Notification");


var do_Imagedoctor = ui ("do_Imagedoctor");
var do_Label_name = ui ("do_Label_name");
var do_Label_descript = ui ("do_Label_descript");

var root = ui ("$");

root.setMapping({
	"do_Imagedoctor.source":"headImg",
	"do_Label_name.text":"userName",
	"do_Label_descript.text":"content"
})