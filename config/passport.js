
var bcrypt = require('bcrypt-nodejs');
var db = require('../database/database');
var local = require('passport-local').Strategy;

function hashPassword(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

function checkPassword(password, hash){
	return bcrypt.compareSync(password, hash);
}


module.exports = function(passport){

	passport.serializeUser(function(user, done){
		return done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		db._passportGetUser(id, function(err, user){
			return done(err, user);
		});
	});

	passport.use('signup', 
	new local({
		usernameField : 'email',
    	passwordField : 'password',
    	passReqToCallback: true
	},
	function(req, email, password, done){
		// Test email exists
		db._passportTestExist(email, function(err, tst){
			if(err){
				return done(err);
			} 
			if(tst){
				console.log("eMail already in use")
				return done(null, false);
			} else{
				//Insert with hashed password
				var user = {};
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
						return done(err);
					} else{
						return done(null, user);
					}
				});
			}
		});
	})); //End local signup

	passport.use('login', 
	new local({
		usernameField : 'email',
    	passwordField : 'password',
    	passReqToCallback: true
	},
	function(req, email, password, done){
		db._passportGetUserByEmail(email, function(err, user){
			if(err){
				return done(err);
			}
			if(!user){
				//User doesnt exist
				return done(null, false);
			} else if (checkPassword(password, user.password)){
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	}));
};
