var mysql2 = require("mysql2");
require('JSON');


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

	}
};
