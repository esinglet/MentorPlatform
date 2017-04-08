var aws = require('aws-sdk');

// load config
var config =require('../config/config.json');
aws.config.update(config["ses"]);

// load AWS SES
var ses = new aws.SES({apiVersion: '2010-12-01'});

// send to list
var to = ['success@simulator.amazonses.com'];
var from = 'noreply@odysseymentorship.com';


module.exports = {
    sendEmail: function(to, subject, body) {
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
                //todo: increment the email count + save a record of the link in the database
                //todo: we should probably log the email in a file somewhere, if that's possible

                console.log('Email sent:');
                console.log(data);
            });
    }
};
