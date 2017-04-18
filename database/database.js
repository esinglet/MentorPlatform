var mysql2 = require("mysql2");
require('JSON');
var config =require('../config/config.json');

var pool =  mysql2.createPool(config["aws"]);


function qu(qur, args, callback){
	pool.getConnection(function(err, con){
		if(err) {
			console.log(err);
			return callback(err, null);
		}

		con.query(qur, args, function(err, rows){
			con.release();
			if(!err) {

				return callback(null, rows);
			} else{
				console.log(err);
				return callback(err,null);
			}
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
		var qur = "select personid as id, fname, lname, password, email, role, org, active from people where email = ?";
		var args = [email];
		qu(qur, args, function(err, rows){
			if(err){
				return callback(err, false);
			} 
			if(rows[0]){
				console.log(rows[0]);
				return callback(false, rows[0]);
			} else{
				return callback(false, false);
			}
		});
	},
//Creates a user with given info and returns id of new user
	_passportAdminCreate: function(info, callback){
		var qur = "insert into people (fname, lname, email, password, role, org, active, admin) values(?, ?, ?"+
			", ?, 2, ?, 1, null)";

		var orgQur = "insert into organizations (name) values(?)";
		var org = [info.org];
		console.log(org);


		qu(orgQur, org, function(err, rows){

			if(err){
				return callback(err, false);
			}

			var args = [];
			args.push(info.fname);
			args.push(info.lname);
			args.push(info.email);
			args.push(info.password);
			args.push(rows.insertId);

			qu(qur, args, function(err, rows){
				if(err){
					console.log(err);
					return callback(err, false);
				} 
				return callback(false, rows.insertId);
			});

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
	},


	//Create a non-admin user
	createPerson: function(info, callback){

		if(info.role === 2){
			console.log("Can't create an admin");
			return callback(true, null);
		}
		var qur = "insert into people (fname, lname, email, role, org, active, admin) values(?, ?, ?"+
			", ?, ?, 1, ?)";

		var args = [];
		args.push(info.fname);
		args.push(info.lname);
		args.push(info.email);
		args.push(info.role);
		args.push(info.org);
		args.push(info.admin);

		qu(qur, args, function(err, rows){
			if(err){
				return callback(err, false);
			} else{
				return callback(null, rows);
			}

		});


	},
	//creates a relationship between 2 specified members of an organization
	createRelationship: function(info, callback){
		//id, mentor, mentee, created, rate, date_start  //rate = number of weeks
		var qur="insert into relationships values (null, ?, ?, CURDATE(), ?, ?, NULL, 0);";
		var args = [];
		args.push(info.mentor);
		args.push(info.mentee);
		args.push(info.rate);
		args.push(info.date_start);

		qu(qur, args, function(err, rows){
			if(err){
				console.log(err);
				return callback(err, false);
			}
			return callback(false, rows.insertId);
		});
	},

	getRelationships: function(callback){
		var qur = `select relid ,mentor, mentee, date_created, rate, date_start, date_met, 
		email_count, mentor.personid, mentor.fname, mentor.lname, mentor.email,
			mentor.role, mentor.org, mentor.active, mentor.admin, mentee.personid as menteeid,
			mentee.fname as menteefname, mentee.lname as menteelname, mentee.email as menteeemail, 
			mentee.role as menteerole, mentee.org as menteeorg, mentee.active as menteeactive,
			mentee.admin as menteeadmin
		from relationships r 
			join people mentor on mentor.personid = r.mentor 
			join people mentee on mentee.personid = r.mentee 
			where mentor.org = mentee.org `;

		qu(qur, [], function(err, rows){
			if(err){
				return callback(err, false);
			}
			return callback(false, rows);
		});

	},

	//get people who belong to an org
	getOrgPeople: function(info, callback){
		var qur="select personid, fname, lname, email, role, active, admin from people where org=? and role != 2";
		var args = [];
		args.push(info.org);
		qu(qur, args, function(err, rows){
			if(err){
				console.log(err);
				return callback(err, false);
			}
			return callback(false, rows);
		});

	},

	//get relationships between people in an org
	//# relid, mentor, mentee, date_created, rate, date_start, date_met, email_count, personid, fname, lname, email, password, role, org, active, admin, personid, fname, lname, email, password, role, org, active, admin
	//'10', '47', '48', '2017-03-21', '2', '2017-02-20', NULL, '0', '47', 'hunter', 'Thompson', 'sdfsdfsd@erer', NULL, '3', '9', '1', '20', '48', 'jon', 'jones', 'martion@manhunter.com', NULL, '4', '9', '1', '20'

	getOrgRelationships: function(info, callback){
		var qur=`select relid,mentor, mentee, date_created, rate, date_start, date_met, 
		email_count, mentor.personid, mentor.fname, mentor.lname, mentor.email,
			mentor.role, mentor.org, mentor.active, mentor.admin, mentee.personid as menteeid,
			mentee.fname as menteefname, mentee.lname as menteelname, mentee.email as menteeemail, 
			mentee.role as menteerole, mentee.org as menteeorg, mentee.active as menteeactive,
			mentee.admin as menteeadmin
		from relationships r 
			join people mentor on mentor.personid = r.mentor 
			join people mentee on mentee.personid = r.mentee 
			where mentor.org = mentee.org 
			and mentor.org = ? 
			`;
		var args = [];
		args.push(info.org);
		qu(qur, args, function(err, rows){
			if(err){
				console.log(err);
				return callback(err, false);
			}
			return callback(false, rows);
		});

	},

	incrimentRelationship: function(relid, callback){
		var qur = "update relationships set email_count = email_count + 1 where relid = ?;";
		var args = []; 

		args.push(relid);
		qu(qur, args, function(err, ret){
			if(err){
				console.log(err);
				return callback(err, false);
			}
			return callback(false, ret);
// 	ret	=   ResultSetHeader {
//   fieldCount: 0,
//   affectedRows: 1,
//   insertId: 0,
//   info: '(Rows matched: 1  Changed: 1  Warnings: 0',
//   serverStatus: 2,
//   warningStatus: 0,
//   changedRows: 1 }

		});
	},

	zeroRelationship: function(relid, callback){
		var qur = "update relationships set email_count = 0 where relid = ?;";
		var args = []; 

		args.push(relid);
		qu(qur, args, function(err, ret){
			if(err){
				console.log(err);
				return callback(err, false);
			}
			return callback(false, ret);
		});
	}, 

	getAdmins: function(){
		var qur = "select * from people where role = 2"
		var p = new Promise(function(resolve, reject) {
			qu(qur, [], function (err, ret) {
				var dict = {};
				if (err) {
					reject(err);
				}
				ret.map(function (arg) {
					dict[arg.org] = arg;
				});
				resolve(dict);
			});
		});
		return p;
	}
};


var info = {
	fname: "Evan",
	lname: "Singleton",
	email: "a@b.ca",
	role: 3,
	org: 5, 
	admin: 11,

}

 var res = module.exports.getAdmins();
 	res.then(function(dict){
		console.log( dict);
	});
//module.exports.createPerson(info, function(err, res){if(err){console.log(err.message);return;}else{console.log(res)}});