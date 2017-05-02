var cron = require("node-cron");
var db = require("../database/database.js");
var email = require("./email");

//we expect rate to be rate*emails sent to ensure that emails are not sent everyday
function testOverdue(rate, dif){
    var range = rate * 7;
    if(dif >= range){
        return true;
    } else{
        return false;
    }
}


//No leading zero, 
//see: https://www.npmjs.com/package/node-cron
cron.schedule("1 17 20 * * *", function(){
    db.getRelationships(function(err, data){
            if(err){
                //Log error TODO
                throw err;
            }
            db.getAdmins().then(function(admins){
                var curDate = new Date();
                data.map(function(rel){
                    let date;
                    if(rel.date_met){
                        date = rel.date_met;
                    } else{
                        date = rel.date_start;
                    }
                    let dif = (curDate.getTime() - Date.parse(date))/(60*60*24*1000);
                    let rate = (rel.email_count!=0)? rel.rate*rel.email_count :rel.rate;
                    console.log('rate '+rate);
                    if(testOverdue(rate, dif)){
                        try {
                            console.log("here");
                            //Send email only mentee
                            email.sendEmailMesg([rel.menteeemail], 'Your Odyssey Mentorship Survey Ready', 'email body');

                            //increment email count
                            db.incrimentRelationship(rel.relid, function(e, ret){
                                if (e)
                                    throw e;
                            });

                            //send emails with multiple of 3 to the admin
                            if ((rel.email_count+1)%3 === 0){
                                let subject = `${rel.menteefname} ${rel.menteelname} is late with their Odyssey Mentorship Survey`;
                                let body = `Someone is late with their Odyssey Mentorship Survey`;
                                //email.sendEmailMesg([admins[rel.org].email], subject, body);
                            }
                        } catch (e){
                            //todo: any email errors should be handled here
                            throw e;
                        }
                    }
                });
            }).catch(function(err){
                throw err;
            });
    });
});



