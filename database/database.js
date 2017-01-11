var mysql2 = require("mysql2");
require('JSON');


//https://codeforgeek.com/2015/01/nodejs-mysql-tutorial/

var pool      =    mysql2.createPool({
    connectionLimit : 100, 
    host     : 'localhost',
    port     : '3036',
    user     : 'root',
    password : 'password',
    database : 'mentorshipapp',
    debug    :  false
});



function query(req, res, qur){
	pool.getConnection(function(err, con){
		if(err) {
			console.log(err.code);
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
	});
}

module.exports = {
//Get all people in organization
	get_people: function(req, res, org_name) {
		var qur = "select * from people join organizations on people.org_id=organizations.org_id where name = '" + org_name + "'";
		query(req, res, qur);
	},
//Create organization 
	create_org: function(req, res, name, email, password){
		var qur = "insert into organizations (email, password, name) values('"+email+"', '"+password+"', '"+name+"')";
		query(req, res, qur);
	},
//Update password
	change_password: function(req, res, oldpass, newpass, email, name){
		var qur = "update organizations set password='"+newpass+"' where name = '"+name+"' and email = '"+email+"' and password='"+oldpass+"'";
		query(req, res, qur);
	}

};

