var cron = require("node-cron");
var db = require("../database/database.js");
var email = require("email");

email.

function testOverdue(rate, dif){
    var range = rate * 7;
    console.log(range);
    if(dif >= range){
        /* Send email */
        /* Incriment counter */
        /* Test if admin notified */
    }
}

var sendEmail = db.getRelationships(function(err, data){
            if(err){
                throw err;
            } 
            console.log(data);
            var curDate = new Date();

            for (r in data){
                var rel = data[r];
                if(rel.date_met){
                    var date = rel.date_met;
                } else{
                    var date = rel.date_created;
                }
                var dif = (curDate.getTime() - Date.parse(date))/(60*60*24*1000);
                console.log(dif);
                testOverdue(rel.rate, dif);
            }
    });


// http://www.nncron.ru/help/EN/working/cron-format.htm
cron.schedule("50 20 * * *", function(){
    sendEmail();
});



