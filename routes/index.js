
var db = require("../database/database")
var passport = require('passport');

/* GET home page. */ /*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router; */

function auth(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else{
        //TODO redirect to home page (or whatever)
    }
}


//https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
module.exports = function (app, passport) {
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
        
        res.render('login.ejs');
    });

    //serve up the survey
    app.get('/survey1', function (req, res) {
        res.sendFile('mentor_survey_1.html', { root: './public' });
    });

    //grab the posted form elements from the post params
    app.post('/survey1', function (req, res) {
        console.log(req.body);
        res.redirect('/submission_received');
    });

    //successful submission
    app.get('/submission_received', function (req, res) {
        res.sendFile('successful_submission.html', { root: './public' });
    });

    //Create  non admin user
    app.post('/create_user', function(req, res){
        db.createUser(req, res);
    });

    app.get('/create_user', function (req, res) {
        res.sendFile('add_user.html', { root: './public' });
    });

    app.get('/login', function(req, res){
            res.render('login.ejs');
    });

    app.post('/signup', passport.authenticate('signup', {
        successRedirect: '/signupSuccess',
        failureRedirect: '/signupFail'
    }));

    app.post('/login', passport.authenticate('login', {
        successRedirect: '/create',
        failureRedirect: '/loginFail'
    }));

    app.post('/testEmail', function(req, res){
        console.log(req.body.email);
        db._passportTestExist(req.body.email, function(err, test){
            if(err||test){
                res.json({result:1});
            } else{
                res.json({result:0});
            }
        });
    });

    /*----------- need to add "Auth" to these functions----------------*/
    app.post('/createRelationship', auth,function(req, res){
        db.createRelationship(req, function(err, suc){
            if(err){
                res.json({result:1});
            } else {
                res.json({result:0});
            }
        });
    });

    //test with: curl --data "org=2" http://localhost:3000/getOrgPeople
    //returns a list of people as json
    app.post('/getOrgPeople',function(req, res){
        db.getOrgPeople(req.body, function(err, suc){
            if(err){
                res.json({result:1});
            } else {
                console.log(suc);
                res.json(suc);
            }
        });
    });

    app.get('/admin_panel', function (req, res) {
        res.sendFile('admin_dashboard.html', { root: './public' });
    });


    app.post("/createUser", auth, function(req, res){
        var admin = req.user;
        var info = {};

        info.fname = req.body.fname;
        info.lname = req.body.lname;
        info.email = req.body.email;
        info.role = req.body.role;
        info.org = admin.org;
        info.admin = admin.id;
        db.createPerson(info, function(err, rows){
            if(err){
                console.log(err);
            }
        })
        res.sendFile('add_user.html', { root: './public' });
    });

    app.get("/create", auth, function(req, res){
        res.sendFile('add_user.html', { root: './public' });
    });

};
