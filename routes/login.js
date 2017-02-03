module.exports = function (app) {
	app.post('/login/:email/:password', function(req, res){
		var email = decodeURIComponent(req.params.email),
			password = decodeURIComponent(req.params.password);

		//FOR TESTING, JUST SEND THE USER ON
		console.log("hi there");
		res.redirect('/survey1');
	});
};
