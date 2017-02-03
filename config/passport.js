http://stackoverflow.com/questions/23481817/node-js-passport-autentification-with-sqlite
https://scotch.io/tutorials/easy-node-authentication-setup-and-local
http://blog.robertonodi.me/node-authentication-series-email-and-password/
http://stackoverflow.com/questions/13023361/how-does-node-bcrypt-js-compare-hashed-and-plaintext-passwords-without-the-salt
http://stackoverflow.com/questions/20089582/how-to-get-url-parameter-in-express-node-js
http://stackoverflow.com/questions/5046930/jquery-send-string-as-post-parameters
http://www.ajax-tutor.com/420/jquery-post/
http://stackoverflow.com/questions/19268812/do-i-implement-serialize-and-deserialize-nodesjs-passport-redisstore


var bcrypt = require('bcrypt-nodejs');
var pool = require('../database/pool');

modual.exports = function(passport){

	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		pool.getConnection(function(err, con){		
			if(err){
				console.log(err.message);
				done(err, user);
			}
			con.query("select personid as id, fname, lname, email. role, org, active from people where personid = ?" , id, function(err, rows){
				if(err){
					console.log(err.message);
					done(err, user);
				}
				done(null, rows);  
			})
		})
	});

};

