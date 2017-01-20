module.exports = function (app) {
	app.post('/login/:email/:password', function(req, res){
		var email = decodeURIComponent(req.params.email),
			password = decodeURIComponent(req.params.password);

	});
};
