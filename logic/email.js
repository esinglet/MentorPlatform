var aws = require('aws-sdk');

// load config
var config =require('../config/config.json');
aws.config.update(config["ses"]);

// load AWS SES
var ses = new aws.SES({apiVersion: '2010-12-01'});

// send to list
var to = ['success@simulator.amazonses.com'];

// this must relate to a verified SES account
var from = 'noreply@odysseymentorship.com';


ses.sendEmail( {
    Source: from,
    Destination: { ToAddresses: to },
    Message: {
        Subject: {
            Data: 'A Message To You Rudy'
        }, 
        Body: { 
            Text: {Data: 'Stop your messing around' }
        }
    }
},

function(err, data) {
    if(err) throw err;
    console.log('Email sent:');
    console.log(data);
});