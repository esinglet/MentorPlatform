

var mysql2 = require("mysql2");

module.exports = mysql2.createPool({
    connectionLimit : 100, 
    host     : 'mentor-dev.c3aiprsfywzf.us-west-2.rds.amazonaws.com',
    port     : '3306',
    user     : 'root',
    password : 'password',
    database : 'mentorshipapp',
    debug    :  false
});
