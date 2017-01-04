var express = require('express');
var router = express.Router();
var person = require('../models/models');

/* GET home page. */ /*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router; */

function getPeople(res) {
    person.find(function (err, people) {
        if (err) {
            res.send(err);
        }
        res.json(people); // return all people in JSON format
    });
};

module.exports = function (app) {

    //get all people
    app.get('/api/people', function (req, res) {
        getPeople(res);
    });

    //create a person
    app.post('/api/people', function (req, res) {

        person.create({
            name: req.body.name,
            email: req.body.email
        }, function (err, person) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getPeople(res);
        });

    });

    // delete a person
    app.delete('/api/people/:person_id', function (req, res) {
        person.remove({
            _id: req.params.person_id
        }, function (err, person) {
            if (err)
                res.send(err);

            getPeople(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
