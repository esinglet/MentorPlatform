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
			res.json(err.message);
			return;
		}

		con.query(qur, function(err, rows){
			con.release();
			if(!err){
				res.json(rows);
				return;
			}
		});

		con.on('error', function(err) {      
              res.json({"code" : 101, "status" : "Error in connection database"});
              return;
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
	change_org_password: function(req, res, oldpass, newpass, email, name){
		var qur = "update organizations set password='"+newpass+"' where name = '"+name+"' and email = '"+email+"' and password='"+oldpass+"'";
		query(req, res, qur);
	},
//Update email
	change_org_email: function(req, res, oldemail, newemail, name, password){
		var qur = "update organizations set email='"+newemail+"' where name = '"+name+"' and email = '"+oldemail+"' and password='"+password+"'";
		query(req, res, qur);
	},
//Get organization
//-----------------------------------------vvvvvvvvvvv>>>>>Authentication here?<<<<<<<<<<vvvvvvvvv------------------------------
	get_org: function(req, res, email, password){
		var qur = "select * from organizations where email='"+email+"' and password = '"+password+"'";
		query(req, res, qur);
	}, 
//------------------------------------------^^^^^^^^^^^^>>>>>Authentication here?<<<<<<<<<<^^^^^^^^^^---------------------------
//Create person
	create_person: function(req, res, fname, lname, email, org_name){
		var qur = "insert into people (first_name, last_name, email, date_joined, active, org_id)"+
			"values('"+fname+"', '"+lname+"', '"+email+"', now(), b'1', (select org_id from organizations where name = '"+org_name+"'))";
		query(req, res, qur);
	},
// Update person
// Field = {fname, lname, email, active}
	update_person: function(req, res, field, value, id){
		var fields = {"fname":"first_name", "lname":"last_name", "email":"email", "active":"active"};
		var f = fields[field];
		if(!f){
			//Invalid field
			console.log("Invalid field.");
		} else {
			if(f == 'active'){
				//No quotes around value
				var qur = "update people set "+fields[field]+"= "+value+" where person_id ="+id;
			} else{
				var qur = "update people set "+fields[field]+"= '"+value+"' where person_id ="+id;
			}
			query(req, res, qur);
		}
	},

//Delete person
//UNTESTED
	delete_person: function(req, res, id){
		var qur = "delete from people where person_id ="+id;
		query(req, res, qur);
	},

//UNTESTED
//Get Person
	get_person: function(req, res, id){
		var que = "select * from people where person_id = "+id;
		query(req, res, qur);
	},

//Create relationship
	create_relationship: function(req, res, mentor_id, mentee_id){
		var qur = "insert into relationships (mentor, mentee, date_created) values("+mentor_id+","+mentee_id+", now())";
		query(req, res, qur);
	},
//UNTESTED
//Get relationship
	get_relationship: function(req, res, rel_id){
		var que = "select * from relationships where rel_id = "+rel_id;
		queryD(req, res, qur);
	}, 
//UNTESTED
//Del Relationship
	delete_relationship(req, res, id){
		var que = "delete from relationships where rel_id =" +rel_id;
		query(req, res, que);
	},

//Untested
//MEETINGS
	create_meeting: function(req, res, people){
		pool.getConnection(function(err, con){
			if(err){
				console.log(err.message);
				return;
			}
			con.beginTransaction(function(err){
				if(err){
					console.log(err.message);
					return;
				}
				con.query("insert into meetings (date_created) values(now())", function(err, rows){
					if(err){
						con.rollback(function() {
							con.release();
							console.log(err.message);
            				throw err;
          				});
					}
					var meetingId = rows.insertId;
					console.log(meetingId);
					con.prepare("insert into meeting_persons (person_id, meeting_id, mentor, survey_status) values(?, ?, ?, 0)", function(err, statement){
						if(err){
							con.rollback(function() {
								con.release();
								console.log(err.message);
            					throw err;
          					});
						}
						for (person in people){
							console.log((people[person].mentor?"b'1'":"b'0'"));
							var mentor = people[person].mentor
							statement.execute([people[person].id, meetingId, mentor], function(err, rows){
								if(err){
									statement.close();
									con.rollback(function() {
										con.release();
										console.log(err.message);
            							throw err;
          							});
								}

							});
						}
						statement.close();
						con.commit(function(err){
							if(err){	
								con.rollback(function() {
           							con.release();
									console.log(err.message);
            						throw err;
          						});
							}
							con.release();
							console.log("Commited!");
						});
					});
				});
			});
		});
	}, 
	get_relationships: function(req, res, org_id){
		var qur = "select * from relationships join people on relationships.mentor = people.person_id where org_id = "+org_id;
		query(req, res, qur);
	}
};

