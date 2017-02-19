var mysql2 = require("mysql2");
require('JSON');

var pool      =    mysql2.createPool({
    connectionLimit : 100, 
    host     : 'mentor-dev.c3aiprsfywzf.us-west-2.rds.amazonaws.com',
    port     : '3306',
    user     : 'root',
    password : 'password',
    database : 'odyssey_dev',
    debug    :  false
});


function qu(qur, args, callback){
	pool.getConnection(function(err, con){
		if(err) {
			callback(err, null);
		}

		con.query(qur, args, function(err, rows){
			con.release();
			if(!err) {
				callback(null, rows);
			} else{
				callback(err,null);
			}
		});

		con.on('error', function(err) {      
              res.json({"code" : 101, "status" : "Error in connection database"});
              return;
        });
	});
}

//Returns true if there is a count i.e. a user already exists with an given email
function isCount(result){
	if(result[0]['count(*)'] != 0){
		return true;
	} else{
		return false;
	}
}

module.exports = {
	createUser: function(req, res){
		var query = "insert into people (fname, lname, email, password, role, org, active,admin) values(?, ?, ?"+
			", null, ?, ?, 1, 1)";
		var args = [];
//TODO: admin comes from passport of requesting user request, org should be either created new or from a list of
// 	options, active will always be 1 to start.
		// THe order of these must be the same as the SQL query above
		args.push(req.body['fname']);
		args.push(req.body['lname']);
		args.push(req.body['email']);
		args.push(req.body['role']);
		args.push(req.body['org']);

		qu(query, args, function(err, rows){
			if(err){
				console.log(err.message);
			}
			res.redirect('/submission_received');
		});
	},


//Gets a user by id returns user object with password.
	_passportGetUser: function(id, callback){
		var qur = "select personid as id, fname, lname, email, role, org, active from people where personid = ?";
		var args = [id];
		qu(qur, args, function(err, rows){
			if(err){
				return callback(err, null);
			}

			if(rows[0]){
				return callback(false, rows[0]);
			} else{
				return callback(false, false);
			}
		});
	},
//Gets a user by email returns user object with password. returns first if there are many
	_passportGetUserByEmail: function(email, callback){
		var qur = "select personid as id, fname, lname, email, role, org, active from people where email = ?";
		var args = [email];
		qu(qur, args, function(err, rows){
			if(err){
				return callback(err, false);
			} 
			if(rows[0]){
				return callback(false, rows[0]);
			} else{
				return callback(false, false);
			}
		});
	},
//Creates a user with given info and returns id of new user
	_passportCreate: function(info, callback){
		var qur = "insert into people (fname, lname, email, password, role, org, active, admin) values(?, ?, ?"+
			", ?, 1, ?, 1, null)";

		var args = [];
		args.push(info.fname);
		args.push(info.lname);
		args.push(info.email);
		args.push(info.password);
		//args.push(info.role);
		args.push(info.org);

		qu(qur, args, function(err, rows){
			if(err){
				return callback(err, false);
			} 
			return callback(false, rows.insertId);
		});
	},
//Tests is a person with the given email is in database returns true if a user exists in database
	_passportTestExist: function(email, callback){
		var qur = "select count(*) from people where email=?";
		var args = [email];
		qu(qur, args, function(err, result){
			if(err) {
				return callback(err, true);
			} else {
				return callback(false, isCount(result));
			}
		});
	}


};

//module.exports._passportGetUser(7, function(err, res){if(err){console.log(err.message);return;}else{console.log(res)}});