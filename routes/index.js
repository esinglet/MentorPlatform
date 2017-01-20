
var db = require("../database/database")

/* GET home page. */ /*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router; */


//https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
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
        //TODO: add code
    });

    app.post('/api/organization/:name/:email/:password', function(req, res){
        //TODO: all authentication
        db.create_org(req, res, decodeURIComponent(req.params.name), decodeURIComponent(req.params.email), "tempPassword");
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

    app.get('/', function (req, res) {
        res.sendFile('login.html', { root: './public' });
    });
};
