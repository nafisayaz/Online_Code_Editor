

var jsonfile = require('jsonfile');
var execSync = require('child_process').execSync;

makePath = function(dirname, id){

//	execSync("mkdir "+dirname+"/"+id);
	return dirname+"/cache/"+id+"/";

}

exports.makeConfig = function(id, lang, dirname){

	var file = './config.json'
	var path = makePath(dirname, id);
	console.log("path ------> "+path);

	var obj = {
		id : id,
		lang: lang,
		path: path
	}

	jsonfile.writeFileSync(file, obj);
}

