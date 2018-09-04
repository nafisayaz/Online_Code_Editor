

var ws = require('ws').Server;
const spawn = require('child_process').spawn;


var gizmo = require('./gizmo/gizmo.js');

var websocket = new ws({
	port: 9090
});

websocket.on("connection", function(connection){

	console.log("User connected!! \n");
	connection.send("from rctServer()");

	connection.on('message', function(message){
		

		var data = JSON.parse(message);

		switch(data.type){

			case 'gizmo':
				console.log(data);
				connectToGizmo(data);		

		}

		sendTo(connection, message);
	});




});

function sendTo(connection, message){
	connection.send(message)

}

function connectToGizmo(data){

	gizmo.speechSynthesizer();

/*
	console.log('speechSynthesizer   --------->   Started !!');

	var path = __dirname + '/hunting_gizmo/__main__.py'
	//var path = __dirname + '/hunting_gizmo/speech_synthesizer/speech_synthesizer.py'
	main = spawn('python3', [path] );

	console.log(__dirname);

	main.stdout.on('data', function(data){
		console.log(data.toString())
	});

	main.stderr.on('data', function(data){
		console.log(data.toString())
	});
	
	main.on('close', function(data){
		console.log(data)
	});
*/


}









