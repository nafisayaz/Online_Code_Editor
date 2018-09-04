


$(document).ready(function(){
	console.log("hello")
	var code = $("#editor")[0];
	//console.log($("#editor"))
	var Editor = CodeMirror.fromTextArea( code, { //document.getElementById("#editor"), {
            lineNumbers: true,
            mode:  "xml",
    //        tabSize: 4,
    //        autofocus:true
    //		color:blue

		});
	console.log(Editor)

	Editor.setSize("45%", "100%")


});