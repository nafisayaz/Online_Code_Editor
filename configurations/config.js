

var config = './config.json';
var jsonfile = require('jsonfile');

exports.getpath = function(){
	
	var obj = jsonfile.readFileSync(config);
	return obj.path;
}
