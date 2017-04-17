var cron = require("node-cron");
var db = require("../database/database.js");
var email = require("email");


function testOverdue(rate, dif){
    var range = rate * 7;
    console.log(range);
    if(dif >= range){
        return true;
    } else{
        return false;
    }
}




// http://www.nncron.ru/help/EN/working/cron-format.htm
cron.schedule("50 20 * * *", function(){
    db.getRelationships(function(err, data){
            if(err){
                //Log error TODO
                throw err;
            } 
            var curDate = new Date();

            data.map(function(rel){
                let date;
                if(rel.date_met){
                    date = rel.date_met;
                } else{
                    date = rel.date_created;
                }
                let dif = (curDate.getTime() - Date.parse(date))/(60*60*24*1000);

                console.log(dif);
                if(testOverdue(rel.rate, dif)){
                    //Send email
                    //increment
                    //if count = 3 send to emily
                }
            });
    });
});



