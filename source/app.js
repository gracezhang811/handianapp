/**
 * @Author : ��������
 * @Timestamp : 2017-07-18
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");

app.on("loaded", function () {
	app.openPage({
		source:"source://view/cover.ui",
		keyboardMode:"hidden",
		statusBarState:"transparent"
	});
});
