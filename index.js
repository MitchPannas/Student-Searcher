"use strict";

//import the exported modules
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

//create object 'handle'
var handle = {};

handle["/"] = requestHandlers.reqStart;
handle["/start"] = requestHandlers.reqStart;
handle["/upload"] = requestHandlers.reqUpload;
handle["/show"] = requestHandlers.reqShow;
handle["/insertSt"] = requestHandlers.reqInsertSt;
handle["/upPic"] = requestHandlers.reqUpPic;
handle["/addStud"] = requestHandlers.reqAddStud;
handle["/addForm"] = requestHandlers.reqSearchStud;
handle["/searchStud"] = requestHandlers.reqSearchForm;

//Calling the startserver function and passing the router function and handle to it
server.startServer(router.route, handle);