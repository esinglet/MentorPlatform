
var db = require("../database/database")

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
    app.get('/api/people/:org_name', function (req, res) {
        db.get_people(req, res, decodeURIComponent(req.params.org_name));
    });

    //create a person
    app.post('/api/people/:fname/:lname/:email/:orgname', function (req, res) {
        //http://localhost:3000/api/people/Evan/Singleton/test%40test.com/Kramerica%20Inc.
        db.create_person(req, res, req.params.fname, req.params.lname, decodeURIComponent(req.params.email), decodeURIComponent(req.params.orgname));
    });

    // delete a person
    app.delete('/api/people/:person_id', function (req, res) {
        db.delete_person(req, res, req.params.person_id);
    });

    //get relationships
    app.get('/api/rs/:rel_id', function (req, res) {
        db.get_relationships(req, res, req.params.rel_id);
    });

    //create a relation
    app.post('/api/relationship', function (req, res) {

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
