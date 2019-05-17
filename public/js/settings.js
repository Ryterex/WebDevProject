$(document).ready(function(){
	$('form').on('submit',function(){
		let newpass=$("#newpassword").val();
		let cpass=$("#cpassword").val();
		let oldpass=$("#password").val();
		console.log(newpass);
		console.log(cpass);
		console.log(oldpass);
		if(!newpass || !cpass || !newpass){
			$('#result').text("Please complete the whole form!");
			return false;}
		if(newpass.length<8){
			$('#result').text("Your new password must be at least 8 characters long!");
			return false;}
		if(newpass !== cpass){
			$('#result').text("Both passwords must match!");
			return false;}
		return true;
		});
	});
