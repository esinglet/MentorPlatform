var mysql2 = require("mysql2");
require('JSON');


//https://codeforgeek.com/2015/01/nodejs-mysql-tutorial/

var pool      =    mysql2.createPool({
    connectionLimit : 100, 
    host     : '127.0.0.1',
    port     : '3036',
    user     : 'root',
    password : 'password',
    database : 'odyssey_dev',
    debug    :  false
});


//https://codeforgeek.com/2015/01/nodejs-mysql-tutorial/

//var pool = require('./pool');

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

	_passportGetUser: function(id, callback){
		var qur = "select personid as id, fname, lname, email, role, org, active from people where personid = ?";
		var args = [id];
		qu(qur, args, function(err, rows){
			if(err){
				callback(err, null);
				return;
			}

			if(rows[0]){
				callback(null, rows[0]);
			} else{
				callback({message:"No such user."}, null);
			}
		});
	},
	
	_passportCreateGet: function(info, callback){
		var qur = "insert into people (fname, lname, email, password, role, org, active, admin) values(?, ?, ?"+
			", ?, ?, ?, 1, null)";

		var args = [];
		args.push(info.fname);
		args.push(info.lname);
		args.push(info.email);
		args.push(info.password);
		args.push(info.role);
		args.push(info.org);

		qu(qur, args, function(err, rows){
			if(err){
				callback(err, null);
				return;
			} 
			callback(null, rows.insertId);
		});
	},

	_passportTestExist: function(email, callback){
		var qur = "select count(*) from people where email=?";
		var args = [email];
		qu(qur, args, function(err, result){
			if(err) {
				callback(err, true);
				return;
			} else {
				callback(null, isCount(result));
				return;
			}
		});
	}


};

//module.exports._passportGetUser(7, function(err, res){if(err){console.log(err.message);return;}else{console.log(res)}});