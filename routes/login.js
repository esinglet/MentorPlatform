module.exports = function (app) {
	app.post('/_login', function(req, res){
		var email = decodeURIComponent(req.query.email),
			password = decodeURIComponent(req.query.password);
		console.log(email);
		console.log(password);
	});
};
