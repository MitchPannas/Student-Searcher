"use strict";

//Importing core modules
var http = require('http');
var url = require("url");

function startServer(route, handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " recieved.");
		route(handle, pathname, request, response);
	}
	
	http.createServer(onRequest).listen(41952);
	//Outputting to screen ensuring server has succesfully started
	console.log("Server has started.");
	console.log('Process ID: ', process.pid);
}

exports.startServer = startServer;