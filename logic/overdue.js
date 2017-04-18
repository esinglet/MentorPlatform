var cron = require("node-cron");
var db = require("../database/database.js");
var email = require("./email");

//we expect rate to be rate*emails sent to ensure that emails are not sent everyday
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
cron.schedule("07 18 * * *", function(){
    db.getRelationships(function(err, data){
            if(err){
                //Log error TODO
                throw err;
            }
            var admins;
            db.getAdmins(function (err, data){
                if (err)
                    throw err;
                admins = data;
            });

            var curDate = new Date();

            data.map(function(rel){
                let date;
                if(rel.date_met){
                    date = rel.date_met;
                } else{
                    date = rel.date_start;
                }
                let dif = (curDate.getTime() - Date.parse(date))/(60*60*24*1000);

                console.log(dif);
                if(testOverdue((rel.email_count!=0)? rel.rate*rel.email_count :rel.rate, dif)){
                    try {
                        //Send email
                        email.sendEmail([rel.email], 'Your Odyssey Mentorship Survey Ready', ''); //todo: get token link for survey
                        email.sendEmail(rel.menteeemail, 'Your Odyssey Mentorship Survey Ready', '');

                        //increment email count
                        db.incrimentRelationship(rel.relid, function(e, ret){
                            if (e)
                                throw e;
                        });

                        //send emails with multiple of 3 to the admin
                        if ((rel.email_count+1)%3 === 0){
                            let subject = `${rel.menteefname}, ${rel.menteelname} is late with their Odyssey Mentorship Survey`;
                            let body = `Someone is late with their Odyssey Mentorship Survey`;
                            email.sendEmail(admins[rel.org].email, subject, body);
                        }
                    } catch (e){
                        //todo: any email errors should be handled here
                        throw e;
                    }
                }
            });
    });
});



