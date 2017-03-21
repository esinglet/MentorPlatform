module.exports = function(app){

//======Put any temporary routes for testing here. This should be removable at any time. =======
    app.get("/test_mentorSurvey", function(req, res){
        res.render('mentor_survey');
    });
}