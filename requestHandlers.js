"use strict";

//Importing modules
var fs = require("fs");
var querystring = require("querystring");
var formidable = require("formidable");


function reqStart(request, response) {
	console.log("Request handler 'start' was called.");
	
	//Using FS to read html to be displayed to the client
	fs.readFile("./html/index.html", function (err, body) {
		if (err) {
			response.writeHead(404, {'Content-Type':'text/html'});
			response.write("Content not found");
			response.end();
			throw err;
		}
		
		response.writeHead(200,{'Content-Type':'text/html'});
		response.write(body);
		response.end();
	});
}

//Function for showing the insert student info form
function reqInsertSt(request, response) {
	console.log("Request handler 'insertst' was called.");
	
	//Using FS to read html to be displayed to the client
	fs.readFile("./html/insertSt.html", function (err, body) {
		if (err) {
			response.writeHead(404, {'Content-Type':'text/html'});
			response.write("Content not found");
			response.end();
			throw err;
		}
		
		response.writeHead(200,{'Content-Type':'text/html'});
		response.write(body);
		response.end();
	});
}

function reqAddStud(request, response) {
	console.log("Request handler 'addStud' was called.");
	
	var studDetails = "";
	var i = 0;
	
	//Path that contains the .csv to write to
	var path = "txt/students.csv";
	var form = new formidable.IncomingForm();
	
	//Parsing the contents of the form
	form.parse(request, function (err, fields) {
		console.log("...Processing...");
		//Looping through the form object properties
		for (var property in fields) {
			//Adding the strings together
			if (i < 5) {
				studDetails += (fields[property]) + (",");
			} else {
				studDetails += (fields[property]) + ("\n");
			}
			i++;
		}

		console.log("...Processing Done...");
		
		//Appending new form info to file
		fs.appendFile(path, studDetails, function(err) {
			if (err) {
				console.error("write error:  " + err.message);
			} else {
				console.log("Successful Write to " + path);
			}
		});
		
	});
	
	//
	fs.readFile("./html/againOp.html", function (err, body) {
		if (err) {
			response.writeHead(404, {'Content-Type':'text/html'});
			response.write("Content not found");
			response.end();
			throw err;
		}
		
		response.writeHead(200,{'Content-Type':'text/html'});
		response.write(body);
		response.end();
	});
}

function reqSearchForm(request, response) {	
	console.log("Request handler 'searchForm' was called.");
	
	//Using FS to read html to be displayed to the client
	fs.readFile("./html/searchDegree.html", function (err, body) {
		if (err) {
			response.writeHead(404, {'Content-Type':'text/html'});
			response.write("Content not found");
			response.end();
			throw err;
		}
		
		response.writeHead(200,{'Content-Type':'text/html'});
		response.write(body);
		response.end();
	});
}

function reqSearchStud(request, response) {
	var userInput;
	var form = new formidable.IncomingForm();
	var studentsFound = [];
	var studentCount = 0;
	var holdStud = ""; //Temp var for holding students
	
	form.parse(request, function (err, fields) {
		userInput = fields["degree"];
	});
	
	//Using FS to read the .csv to be processed
	fs.readFile('./txt/students.csv', function (err, data) {
		var dString = data.toString('utf-8');
		var textByLine = dString.split("\n");
		
		if (err) {
			return console.log(err);
		}
		
		for (var i = 0; i < textByLine.length; i++) {
			if (textByLine[i].includes(userInput)) {
				studentsFound.push(textByLine[i] + "\n");
				studentCount++;
			}
		}
		//Converting the studentsFound object to string
		holdStud = studentsFound.toString('utf-8');
		
		//Splitting the holdStud string on commas and new lines
		var tableArr = holdStud.split(/[\n\r,]+/);
		
		//HTML to write to the client
		var table = "<table>"+
		"<th>StudentID</th>"+
		"<th>FirstName</th>"+
		"<th>LastName</th>"+
		"<th>Age</th>"+
		"<th>Gender</th>"+
		"<th>Degree</th>";
		
		table += "<tr>"; //HTML to write to the client
		for (var i = 0; i < tableArr.length; i++) {
			if ((i+1) % 6 != 0) {
				table += "<td>" + tableArr[i] + "</td>";
			} else {
				table += "<td>" + tableArr[i] + "</td><tr></tr>";
			}		
		}
		table += "</tr>"; //HTML to write to the client
		
		table += "</table>"; //HTML to write to the client
		
		//HTML to write to the client
		var body = '<html>'+
		'<head>'+
			'<meta http-equiv="Content-Type" content="text/html; '+ 'charset=UTF-8" />'+
			'<style>'+
				'input[type=text], select {'+
					'width: 50%;'+
					'padding: 12px 20px;'+
					'margin: 8px 0;'+
					'display: inline-block;'+
					'border: 1px solid #ccc;'+
					'border-radius: 4px;'+
					'box-sizing: border-box;'+
				'}'+

				'input[type=submit] {'+
					'width: 60%;'+
					'background-color: #4CAF50;'+
					'color: white;'+
					'padding: 14px 20px;'+
					'margin: 8px 0;'+
					'border: none;'+
					'border-radius: 4px;'+
					'cursor: pointer;'+
				'}'+
				
				'div {'+
					'border-radius: 5px;'+
					'background-color: #f2f2f2;'+
					'padding: 20px;'+
					'margin: auto;'+
					'width: 20%;'+
					'text-align: center;'+
				'}'+
				
			'</style>'+
		'</head>'+
		'<body>'+
			'<div>' +
			'<h2>Found ' + studentCount + ' student(s) in the same degree</h2>'+
			table+
			'<form action="/start" enctype="multipart/form-data" method="post">'+
			'<input type="submit" value="Go Back"/>'+
			'</form>'+
			'</div>' +
		'</body>'+
		'</html>';
		
		response.writeHead(200,{'Content-Type':'text/html'});
		response.write(body);
	});	
}

//Function for showing the upload image form
function reqUpPic(request, response) {
	console.log("Request handler 'uploadpic' was called.");
	
	//Using FS to read html to be displayed to the client
	fs.readFile("./html/upPic.html", function (err, body) {
		if (err) {
			response.writeHead(404, {'Content-Type':'text/html'});
			response.write("Content not found");
			response.end();
			throw err;
		}
		
		response.writeHead(200,{'Content-Type':'text/html'});
		response.write(body);
		response.end();
	});
}

//Function allowing for the uploading of an image
function reqUpload(request, response) {
	console.log("Request handle 'upload' was called.");
	
	var form = new formidable.IncomingForm();
	
	form.uploadDir = './tmp';
	
	console.log("... about to parse ...");
	
	//PArsing the files information
	form.parse(request, function(err, field, file) {
		console.log("Parsing done");
		fs.rename(file.upload.path,"./test.png",function(err) {
			if (err) {
				fs.unlink("./test.png");
				fs.rename(file.upload.path,"./test.png");
			}
		});
	});
	
	//Using FS to read html to be displayed to the client
	fs.readFile("./html/reqUpload.html", function (err, body) {
		if (err) {
			response.writeHead(404, {'Content-Type':'text/html'});
			response.write("Content not found");
			response.end();
			throw err;
		}
		
		response.writeHead(200,{'Content-Type':'text/html'});
		response.write(body);
		response.end();
	});
}

//Funciton allowing for the uploaded image to be shown
function reqShow(request, response) {
	console.log("Request handler 'show' was called");
	response.writeHead(200, {"Content-Type": "image/png"});
	fs.createReadStream("./test.png").pipe(response);
}

//Exporting of functions that are used in other scripts
exports.reqStart = reqStart;
exports.reqUpload = reqUpload;
exports.reqShow = reqShow;
exports.reqInsertSt = reqInsertSt;
exports.reqUpPic = reqUpPic;
exports.reqAddStud = reqAddStud;
exports.reqSearchStud = reqSearchStud;
exports.reqSearchForm = reqSearchForm;
