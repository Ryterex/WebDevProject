$(document).ready(function(){
	$('form').on('submit',function(){
		let username=$("#username").val();
		let password=$("#password").val();
		if(!username || !password){
			$('#error').text("Please provide a username and password!");}
		});
	});
