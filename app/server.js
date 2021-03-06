
var execSync = require('child_process').execSync;
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var uid = require('uid');
var bodyParser = require('body-parser');
var configure = require('./configurations/configure.js');
var cpp=require('./languages/cpp.js');
var py=require('./languages/py.js');

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

server.listen(8000,function(){console.log('Server is up....');});

app.get('/*',function(req,res){
	
	res.sendFile(__dirname + '/views/index.html');
});

app.post("/compile", function(req, res) {
	console.log("Post Request Done");
    var code = req.body.code; 
	var input = req.body.input; 
	var projectID = req.headers.referer.split('/')[3];
	var lang = req.body.lang;
	
	configure.makeConfig(projectID, lang, __dirname);

	if(lang == "c++"){
		console.log('c++')
        var compile_info=cpp.compile(code,input);
		if( compile_info['status'] === 1 ){
			
			console.log(compile_info['status']);
			res.end(compile_info['error']);

		}
		else{
			res.end(cpp.run());
		}
	}

	if(lang == "python"){
		console.log(lang);
		py.run(code, input);
		//console.log(py.run(code, input).toString());
		res.end(py.run(code, input));
	}
});



var names=[];
var users={};
var codes={};
io.on('connection',function(socket){
    if((socket.handshake.headers.referer=="http://192.168.1.8:8000/")||( socket.handshake.headers.referer=="http://localhost:8000/")){
        var projectid=uid();
        socket.projectID=projectid;
        socket.join(projectid);
		execSync("mkdir cache/" + projectid);
				
        socket.emit('projectID',projectid);
    }
    else{
        var projectid=socket.handshake.headers.referer.split('/')[3];
        socket.projectID=projectid;
        socket.join(projectid);
        socket.emit('edited',codes[socket.projectID]);
    }
    
    socket.on('compile_msg',function(msg){
        io.in(socket.projectID).emit('compile_msg',msg);
    })
    socket.on('edited',function(code){
        codes[socket.projectID]=code;
        socket.broadcast.to(socket.projectID).emit('edited',code);//Send to all in the room except the sender.
    })



	socket.on('user',function(data){
				names.push(data);
				users[socket.id]=data;
	//			io.sockets.emit('names',names);
	});

	socket.on('chat message',function(message){
			if(message){
				io.in(socket.projectID).emit('chat message',users[socket.id]+" :: "+message);
				//console.log("Message Emitted from: " + users[socket.id]);
			}
		});

	socket.on('disconnect',function(){
		if( !(socket.id in users )) return;
		var tmp=users[socket.id];
		names.splice(names.indexOf(users[socket.id]),1);
		delete users[socket.id];
		socket.broadcast.to(socket.projectID).emit('out',tmp);
		socket.broadcast.to(socket.projectID).emit('names',names);
		});
});
