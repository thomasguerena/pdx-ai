const electron = require('electron');
const app = electron.app;
var Window = electron.BrowserWindow;

app.on('ready', function () {
	var win = new Window({
		width: 800,
		height: 600
	});
	win.loadURL('file://' + __dirname + '/app/index.html');
});