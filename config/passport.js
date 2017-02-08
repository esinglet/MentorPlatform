/*http://stackoverflow.com/questions/23481817/node-js-passport-autentification-with-sqlite
https://scotch.io/tutorials/easy-node-authentication-setup-and-local
http://blog.robertonodi.me/node-authentication-series-email-and-password/
http://stackoverflow.com/questions/13023361/how-does-node-bcrypt-js-compare-hashed-and-plaintext-passwords-without-the-salt
http://stackoverflow.com/questions/20089582/how-to-get-url-parameter-in-express-node-js
http://stackoverflow.com/questions/5046930/jquery-send-string-as-post-parameters
http://www.ajax-tutor.com/420/jquery-post/
http://stackoverflow.com/questions/19268812/do-i-implement-serialize-and-deserialize-nodesjs-passport-redisstore*/


var bcrypt = require('bcrypt-nodejs');
var db = require('../database/database');
var local = require('passport-local').Strategy;

function hashPassword(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}


module.exports = function(passport){

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		db._passportGetUser(id, function(err, user){
			return done(err, user);
		});
	});

	passport.use('signup', 
	new LocalStrategy({
		usernameField : 'email',
    	passwordField : 'password'
	}),
	function(req, email, password, done){
		// Test email exists
		db._passportTestExist(email, function(err, tst){
			if(err){
				console.log(err.message);
				return;
			} 
			if(tst){
				console.log("eMail already in use")
				return;
			} else{
				//Insert with hashed password
				var info = {};
				user.fname = req.body.fname;
				user.lname = req.body.lname;
				user.email = req.body.email;
				user.password = hashPassword(req.body.password);
				user.role = req.body.role;
				user.org = req.body.org;
				db._passportCreate(user, function(err, id){
					delete user.password;
					user.id = id;
					if(err){
						return done(err, user);
					} else{
						return done(null, user);
					}
				})
			}
		});
	}); //End local signup

};

console.log(hashPassword("password"));