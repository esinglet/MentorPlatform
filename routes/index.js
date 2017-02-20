
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

    app.get("/", auth, function(req, res){
        res.sendFile('front.html', { root: './public' });
    });

    app.post('/signup', passport.authenticate('signup', {
        successRedirect: '/create',
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
    app.post('/createRelationship', auth, function(req, res){
        db.createRelationship(req, function(err, suc){
            if(err){
                res.json({result:1});
            } else {
                res.json({result:0}); //todo: apply a success indicator to the page
            }
        });
    });

    //test with: curl --data "org=2" http://localhost:3000/getOrgPeople
    //returns a list of people as json
    app.post('/getOrgPeople', auth, function(req, res){
        db.getOrgPeople(req.body, function(err, suc){
            if(err){
                res.json({result:1});
            } else {
                console.log(suc);
                res.json(suc);
            }
        });
    });

    app.get('/admin_panel', auth, function (req, res) {
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
