'use strict';

var loop = function (func, speed) {
	var start = new Date();
	var delta = 0;
	func();
	delta = start - new Date();
	setTimeout(function () {
		loop(func, speed);
	}, Math.max(0, speed-delta));
};

module.exports = loop;