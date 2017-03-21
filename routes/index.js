
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
        res.redirect("/?loginfail="+encodeURIComponent("yes"));
    }
}

//https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
module.exports = function (app, passport) {

    app.get("/", function(req, res){
        res.render('front', { root: './public' });
    });

    app.post('/signup', passport.authenticate('signup', {
        successRedirect: '/create',
        failureRedirect: '/signupFail'
    }));

    app.post('/login', passport.authenticate('login', {
        successRedirect: '/manage',
        failureRedirect: "/?loginfail="+ encodeURIComponent("yes")
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
    app.get('/manage', auth, function(req, res){
        res.render('manage.ejs', { user: req.user });
    });

    app.get('/logout', auth, function(req, res){
        req.logout();
        req.session.destroy();
        res.redirect('/');
    });

    app.post('/createRelationship', auth, function(req, res){
        db.createRelationship(req.body, function(err, suc){
            if(err){
                res.json({result:1});
            } else {
                res.json({result:0}); //todo: apply a success indicator to the page
            }
        });
    });

    //test with: curl --data "org=2" http://localhost:3000/getOrgPeople
    //returns a list of people as json
    app.get('/getOrgPeople',auth, function(req, res){
        db.getOrgPeople(req.user, function(err, suc){
            if(err){
                res.json({result:1});
            } else {
                res.json(suc);
            }
        });
    });

    app.get('/getOrgRelationships', auth,  function(req, res){
        console.log(req.user);
        db.getOrgRelationships(req.user, function(err, rows){
            if(err){
                res.json(err);
            } else{
                res.json(rows);
            }

        });

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
        res.json({result:0});
    });

    app.get('/people', auth,  function(req, res){
        console.log(req.user);
        db.getOrgPeople(req.user, function(err, rows){
            if(err){
                res.json(err);
                console.log('fdsaf')
            } else{
                console.log(rows);
                console.log('test')
                res.json(rows);
            }
            
        });
        
    });

    //===================old/ depreciated ===========================
    //TODO: remove? remember to also remove the view
    app.get('/admin_panel', auth, function (req, res) {
        res.render('Depreciated/admin_dashboard', { user: req.user });
    });
    //TODO: remove? remember to also remove the view
    app.get("/create", function(req, res){
        res.render('Depreciated/add_user', { user: req.user });
    });

};
