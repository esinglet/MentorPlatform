$(document).on("submit", "#login", function(){
	var email = $('#email').val(),
		password = $('#password').val();
	if(!validate(email, password)){
		$("#retry").show();
	} else{
		$.post('/login/'+encodeURIComponent(email)+'/'+encodeURIComponent(password));
	}
});

function validate(un, pw){
	if((un === "") || (pw === "")){
		return false;
	} else{
		return true;
	}
}