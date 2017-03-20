var app = angular.module('displayPeople', []);


//https://www.w3schools.com/angular/angular_routing.asp
// app.config(function($routeProvider) {
//     $routeProvider
//     .when("/", {
//         templateUrl : "main.htm"
//     })
//     .when("/red", {
//         templateUrl : "red.htm"
//     })
//     .when("/green", {
//         templateUrl : "green.htm"
//     })
//     .when("/blue", {
//         templateUrl : "blue.htm"
//     });
// });


function DisplayPeopleController($scope, $http){

	$scope.load = function(){
		$http.get('/people').success(function(data, status, headers, config){
			$scope.people = data;
		});
	};

	$scope.form = {
		fname:"",
		lname:"",
		email:"",
	};

	$scope.submit = function(){
		console.log("theh");
		$http.post('/createUserAng', JSON.stringify($scope.form)).then($scope.load());
	}

	var element = angular.element(document.querySelector('#userform')); 
	var height = element[0].offsetHeight;
	console.log("Height" + height);
	$scope.load();

	$scope.formSty = {
		height: height+"px"
	}
}

app.controller('DisplayPeopleController', DisplayPeopleController);