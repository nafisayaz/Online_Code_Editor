


var socket=io();
$(function($){

	//Sending
	$("#prog").submit(function(e){
			e.preventDefault();
			var code=$("#code").val(),input = $("#input").val(),lang = $('#lang').val();
			var body = {
				code : code, 
				input : input,
				lang : lang
			};
			$.post("/compile", body ,function(compile_msg){
				socket.emit('compile_msg',compile_msg);
			});
	})
});

//Receiving
socket.on('compile_msg',function(msg){
	$("#compile_msg").html(msg);
});

socket.on('edited',function(code){
	$("#code").val(code);
});

socket.on("projectID",function(name){
	window.location.href=name;
});

function send(){
	socket.emit('edited',$("#code").val());
}

// This is for prompt
url=window.location.href;
if(url=="http://localhost:8000/"){
	;
}
else{
	var name= prompt("Enter your name: ");
	socket.emit('user',name);
}

var url=window.location.pathname.split('/')[1];
$("#codeId").html('Your CodeId: '+'<b>'+ url+'<b>');


//This is for chatting
$(function($){

	socket.on('chat message',function(message){
		$("#messages").append($('<li>').text(message));
	});

	socket.on('out',function(name){
		$("#messages").append($('<li>').text(name+" logged out."));
		});


	$('#msgform').submit(function(e){
		e.preventDefault();
		socket.emit('chat message', $('#m').val() );
		$('#m').val('');
	});

	socket.on('names', function(message){
		var html = '<b>Connected Users<b><br><br>';
		for(i=0; i < message.length; i++){
			html+= message[i] + '<br/>'
		}
		$('#users').html(html);
	});

});

