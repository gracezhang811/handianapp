/**
 * related to decr_body_con2_templates.ui
 * 
 * @Author : √流浪者
 * @Timestamp : 2017-07-28
 */
var page = sm ("do_Page");
var app = sm("do_App");
var nf = sm ("do_Notification");

var do_Label_4 = ui ("do_Label_4");
var do_Label_title = ui ("do_Label_title");
var do_Label_body = ui ("do_Label_body");
var root = ui ("$")


root.setMapping({
	"do_Label_4.tag":"id",
	"do_Label_title.text":"question",
	"do_Label_body.text" :"answer",
	"do_Label_4.text":"questionid"
})