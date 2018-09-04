



jQuery(function($, undefined) {
	
	
    $('#terminal').terminal(function(command) {
    	
        if (command !== '') {
            
            try {
                var result = window.eval(command);
                if (result !== undefined) {
                    this.echo(new String(result));
                }
            } catch(e) {            		
                this.error(new String(e));
            }
            
            /*
            
            var body = {
                command: command
            }
            $.post("/shell", body ,function(compile_msg){
                this.echo(compile_msg)
                //socket.emit('compile_msg',compile_msg);
            });
            */

            
        } 
        else {
           this.echo('');
        }
    }, {
        greetings: '\t\t\t\t\t\tUSER TERMINAL\n \t\t\t\t\t\t\t\t\t        [ @ Nafis Ayaz ] ',
        name: 'js_demo',
        height: 640,
        width: 450,
        prompt: 'nafis@~'

    });
    /*
    $("terminal").terminal.echo("hello", {
    	finalize: function(div){
    		div.css("color", "red");
    	}
    });
    */
});




