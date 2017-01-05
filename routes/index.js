var express = require('express');
var router = express.Router();
var models = require('../models/models');
var person = models.personModel;
var relation = models.relationshipModel;

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

function getRelations(res) {
    relation.find(function (err, relations) {
        if (err) {
            res.send(err);
        }
        res.json(relations);
    });
};

module.exports = function (app) {
    //API ---------------------------------------------------------
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

    //get relationships
    app.get('/api/relationship', function (req, res) {
        getRelations(res);
    });

    //create a relation
    app.post('/api/relationship', function (req, res) {

        relation.create({
            mentor: req.body.mentor_id,
            mentee: req.body.mentee_id
        }, function (err, relation) {
            if (err)
                res.send(err);
            getRelations(res);
        });

    });

    // delete a relation
    app.delete('/api/relationship/:relation_id', function (req, res) {
        relation.remove({
            _id: req.params.relation_id
        }, function (err, relation) {
            if (err)
                res.send(err);

            getRelations(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the main page
    });
};
