var mysql2 = require("mysql2");
require('JSON');


<<<<<<< HEAD
=======
//https://codeforgeek.com/2015/01/nodejs-mysql-tutorial/

var pool      =    mysql2.createPool({
    connectionLimit : 100, 
    host     : 'mentor-dev.c3aiprsfywzf.us-west-2.rds.amazonaws.com',
    port     : '3306',
    user     : 'root',
    password : 'password',
    database : 'odyssey_dev',
    debug    :  false
});
>>>>>>> refs/remotes/origin/master

//https://codeforgeek.com/2015/01/nodejs-mysql-tutorial/

var pool = require('./pool');

function qu(qur, args, callback){
	pool.getConnection(function(err, con){
		if(err) {
			callback(err, null);
		}

		con.query(qur, args, function(err, rows){
			con.release();
			console.log("test");
			if(!err) {
				callback(null, rows);
			} else{
				callback(err,null);
			}
		});
<<<<<<< HEAD

		con.on('error', function(err) {      
              res.json({"code" : 101, "status" : "Error in connection database"});
              return;
        });
	});
}

function cleanQuery(qur, args, callback){
	pool.getConnection(function(err, con){
		if(err) {
			callback(err, false);
		}

		con.query(qur, function(err, rows){
			con.release();
			if(!err){
				callback(false, rows);
			}
		});

		con.on('error', function(err) {      
              callback(err, false);
        });
	});
}


//Debug
function queryD(req, res, qur){ 
	pool.getConnection(function(err, con){
		if(err) {
			console.log(err.message);
			return;
		}

		con.query(qur, function(err, rows){
			con.release();
			if(!err){
				console.log(rows);
				return;
			}
		});

		con.on('error', function(err) {      
              console.log({"code" : 101, "status" : "Error in connection database"});
              return;
        });
=======
>>>>>>> refs/remotes/origin/master
	});
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
<<<<<<< HEAD
	}, 
	get_relationships: function(req, res, org_id){
		var qur = "select * from relationships join people on relationships.mentor = people.person_id where org_id = "+org_id;
		query(req, res, qur);
	},


	getUserLogin: function(id, callback){
		var qur = "select personid as id, fname, lname, email. role, org, active from people where personid = ?";
		var args = [id];
		cleanQuery(qur, args, done);
/*		pool.getConnection(function(err, con){		
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
			});
		});*/
	},

	testNewEmail: function(email, callback){
		var qur = "select count(*) from people where email = '?'";
		var args = [email];
		cleanQuery(qur, args, done);
=======

>>>>>>> refs/remotes/origin/master
	}
};
