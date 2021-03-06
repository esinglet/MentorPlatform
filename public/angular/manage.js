var app = angular.module('manageApp',['ngTouch', 'ui.grid', 'ui.grid.cellNav', 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.grid.pinning', 'ui.grid.selection', 'ui.grid.moveColumns', 'ui.grid.exporter', 'ui.grid.importer', 'ui.grid.grouping']);


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
		role:"",
	};

	$scope.submit = function(){
		$http.post('/createUser', JSON.stringify($scope.form)).then(function (){
			$scope.form = {
				fname:"",
				lname:"",
				email:"",
				role:"",
			};
		});
	};

	// var element = angular.element(document.querySelector('#userform'));
	// var height = element[0].offsetHeight;
	// console.log("Height" + height);
	$scope.load();

	$scope.formSty = {
		//height: height+"px"
	}
}

app.controller('DisplayPeopleController', DisplayPeopleController);
app.controller('CreateRelationshipController', function($scope, $http){
	$http.get('/people').success(function(data, status, headers, config){
			$scope.people = data;
	});
	$scope.form = {
		mentor:"",
		mentee:"",
		date_start:"",
		rate:"4"
	};
	$scope.submit = function(){
		console.log($scope.form);
		$http.post('/createRelationship', JSON.stringify($scope.form)).then(function (){
			$scope.form = {
				mentor:"",
				mentee:"",
				date_start:"",
				rate:"4"
			};
		});
	}
});
app.controller('PersonCtrl',  ['$scope', '$http', '$timeout', '$interval', 'uiGridConstants', 'uiGridGroupingConstants',
	function ($scope, $http, $timeout, $interval, uiGridConstants, uiGridGroupingConstants) {

		$scope.gridOptions = {};
		$scope.gridOptions.data = 'myData';
		$scope.gridOptions.enableCellEditOnFocus = true;
		$scope.gridOptions.enableColumnResizing = true;
		$scope.gridOptions.enableFiltering = true;
		$scope.gridOptions.enableGridMenu = true;
		$scope.gridOptions.showGridFooter = true;
		$scope.gridOptions.showColumnFooter = true;
		$scope.gridOptions.fastWatch = true;

		$scope.gridOptions.rowIdentity = function(row) {
			return row.id;
		};
		$scope.gridOptions.getRowIdentity = function(row) {
			return row.id;
		};

		$scope.gridOptions.columnDefs = [
			{ name:'personid', width:100, enableCellEdit: false },
			{ name:'fname', width:100, enableCellEdit: true },
			{ name:'lname', width:100, enableCellEdit: true },
			{ name:'email', width:100, enableCellEdit: true },
			{ name:'role', width:100, enableCellEdit: true },
			{ name:'active', width:100, enableCellEdit: true },
			{ name:'admin', width:100, enableCellEdit: true }
		];

		var i = 0;
		$scope.refreshData = function(){
			$scope.myData = [];

			var start = new Date();

			$http.get('/getOrgPeople')
				.success(function(data) {

					data.forEach(function(row){
						row.id = i;
						i++;
						row.registered = new Date(row.registered);
						$scope.myData.push(row);
					});
				})
				.error(function() {
				});


			$scope.$on('$destroy', function(){
				$timeout.cancel(timeout);
				$interval.cancel(sec);
			});

		};

	}]);

app.controller('DisplayRelationshipCtrl',  ['$scope', '$http', '$timeout', '$interval', 'uiGridConstants', 'uiGridGroupingConstants',
	function ($scope, $http, $timeout, $interval, uiGridConstants, uiGridGroupingConstants) {

		$scope.gridOptions = {};
		$scope.gridOptions.data = 'myData';
		$scope.gridOptions.enableCellEditOnFocus = true;
		$scope.gridOptions.enableColumnResizing = true;
		$scope.gridOptions.enableFiltering = true;
		$scope.gridOptions.enableGridMenu = true;
		$scope.gridOptions.showGridFooter = true;
		$scope.gridOptions.showColumnFooter = true;
		$scope.gridOptions.fastWatch = true;

		$scope.gridOptions.rowIdentity = function(row) {
			return row.id;
		};
		$scope.gridOptions.getRowIdentity = function(row) {
			return row.id;
		};

		$scope.gridOptions.columnDefs = [
			{ name:'relid', width:100, enableCellEdit: false },
			{ name:'mentor', width:100, enableCellEdit: true },
			{ name:'mentee', width:100, enableCellEdit: true },
			{ name:'date_created', width:100, enableCellEdit: true },
			{ name:'rate', width:100, enableCellEdit: true },
			{ name:'date_start', width:100, enableCellEdit: true },
			{ name:'date_met', width:100, enableCellEdit: true },

			{ name:'email_count', width:100, enableCellEdit: false },
			{ name:'personid', width:100, enableCellEdit: true },
			{ name:'fname', width:100, enableCellEdit: true },
			{ name:'lname', width:100, enableCellEdit: true },
			{ name:'email', width:100, enableCellEdit: true },
			{ name:'role', width:100, enableCellEdit: true },
			{ name:'org', width:100, enableCellEdit: true },
			{ name:'active', width:100, enableCellEdit: false },

			{ name:'admin', width:100, enableCellEdit: true },
			{ name:'menteeid', width:100, enableCellEdit: true },
			{ name:'menteefname', width:100, enableCellEdit: true },
			{ name:'menteelname', width:100, enableCellEdit: true },
			{ name:'menteeemail', width:100, enableCellEdit: true },
			{ name:'menteerole', width:100, enableCellEdit: true },

			{ name:'menteeorg', width:100, enableCellEdit: true },
			{ name:'menteeactive', width:100, enableCellEdit: true },
			{ name:'menteeadmin', width:100, enableCellEdit: true }
		];

		var i = 0;
		$scope.refreshData = function(){
			$scope.myData = [];

			var start = new Date();

			$http.get('/getOrgRelationships')
				.success(function(data) {

					data.forEach(function(row){
						row.id = i;
						i++;
						row.registered = new Date(row.registered);
						$scope.myData.push(row);
					});
					$scope.myData.grid.refresh(); //this was necessary to show every column on initial load. 
				})
				.error(function() {
				});


			$scope.$on('$destroy', function(){
				$timeout.cancel(timeout);
				$interval.cancel(sec);
			});

		};

	}]);