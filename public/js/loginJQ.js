$(document).on("submit", "#login", function(){
	var email = $('#email').val(),
		password = $('#password').val();
	if(!validate(email, password)){
		$("#retry").show();
	} else{
		$.post('/_login/?email='+encodeURIComponent(email)+'&password='+encodeURIComponent(password));
	}
});

function validate(un, pw){
	if((un === "") || (pw === "")){
		return false;
	} else{
		return true;
	}
}