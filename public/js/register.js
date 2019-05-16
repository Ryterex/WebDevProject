$(document).ready(function(){
	$('form').on('submit',function(event){
		let username=$("#username").val();
		let password=$("#password").val();
		let cpassword=$("#cpassword").val();
		if(!(username && password)){
			$('#error').text("Please provide a username and password!");
			return false;}
		if(username.length<3){
		 	$('#error').text("Username must be at least 3 characters long!");
			return false;}
		if(password && password.length<8){
			$('#error').text("Password must be at least 8 characters long!");
			return false;}
		if(!cpassword){
			$('#error').text("Please confirm your password!");
			return false;}
		if(password !== cpassword){
			$('#error').text("Both passwords must match!");
			return false;}
		return true;
		});
	});
