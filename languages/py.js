



var spawnSync = require('child_process').spawnSync;
var execSync = require('child_process').execSync;
var config = require('../configurations/config.js');
var fs = require('fs');


exports.run = function(code, input){
	
	var path = config.getpath();
	console.log("path = " + path);
	
	fs.writeFileSync(path+"main.py", code);
	fs.writeFileSync(path+"input.txt", input);

	var msg = spawnSync('./execute',['/usr/bin/python','python',path+'main.py',path+'input.txt']);
	console.log(msg.stdout.toString());

	return msg.stdout;
}
