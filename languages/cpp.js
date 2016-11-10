
var spawnSync = require('child_process').spawnSync;
var execSync = require('child_process').execSync;
var config = require('../configurations/config.js');
var utils = require('../utility/utils.js');
var fs = require('fs');

exports.compile = function(code, input){

	var path = config.getpath();
	console.log("path = " + path);
	
	fs.writeFileSync(path+"main.cpp", code);
	fs.writeFileSync(path+"input.txt", input);

	var message = [];
	var msg = spawnSync("g++", [path + "main.cpp", "-o", path+"main.run"]);

	if(msg.status){
		message['status'] = msg.status;
		message['error']  = utils.replaceAll(msg.stderr.toString(), path, '' );
	}
	
	return message;
}

exports.run = function(){

	var path = config.getpath();
	return execSync("./executes/execute "+path+"main.run "+ "main.run "+path+"input.txt");
}

