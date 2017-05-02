var aws = require('aws-sdk');
var config =require('../config/config.json');
aws.config.update(config["ses"]);
var ses = new aws.SES({apiVersion: '2010-12-01'});
var crypto = require('crypto');

// email address configured with AWS
var from = 'noreply@odysseymentorship.com';

module.exports = {
    sendEmailMesg: function(to, subject, body) {
        //the subject needs to include a link with a query parameter which corresponds to one in the database
        ses.sendEmail( {
                Source: from,
                Destination: { ToAddresses: to },
                Message: {
                    Subject: {
                        Data: subject
                    },
                    Body: {
                        Text: {Data: body }
                    }
                }
            },
            function(err, data) {
                if(err) throw err;

                console.log('Email sent:');
                console.log(data);
            });
    },

    generateEmailToken: function(){
        return crypto.randomBytes(20).toString('hex');
    }

};
