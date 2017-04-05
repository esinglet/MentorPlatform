var cron = require("node-cron");
var db = require("../database/database.js");

// http://www.nncron.ru/help/EN/working/cron-format.htm

function testOverdue(rate, dif){
    var range = rate * 7;
    console.log(range);
    if(dif >= range){
        /* Send email */
        /* Incriment counter */
        /* Test if admin notified */
    }
}


cron.schedule("50 20 * * *", function(){

});


    db.getRelationships(function(err, data){
            if(err){
                /*TODO: Deal with error */
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



