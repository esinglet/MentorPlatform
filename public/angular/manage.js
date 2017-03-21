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
	};

	$scope.submit = function(){
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
			{ name:'personid', width:100 },
			{ name:'fname', width:100 },
			{ name:'lname', width:100, enableCellEdit: true },
			{ name:'email', width:100, enableCellEdit: true },
			{ name:'role', width:100, enableCellEdit: true },
			{ name:'active', width:100, enableCellEdit: true },
			{ name:'admin', width:100, enableCellEdit: true }

			/*{ name:'address.street', width:150, enableCellEdit: true },
			{ name:'address.city', width:150, enableCellEdit: true },
			{ name:'address.state', width:50, enableCellEdit: true },
			{ name:'address.zip', width:50, enableCellEdit: true },
			{ name:'company', width:100, enableCellEdit: true },
			{ name:'email', width:100, enableCellEdit: true },
			{ name:'phone', width:200, enableCellEdit: true },
			{ name:'about', width:300, enableCellEdit: true },
			{ name:'friends[0].name', displayName:'1st friend', width:150, enableCellEdit: true },
			{ name:'friends[1].name', displayName:'2nd friend', width:150, enableCellEdit: true },
			{ name:'friends[2].name', displayName:'3rd friend', width:150, enableCellEdit: true },
			{ name:'agetemplate',field:'age', width:150, cellTemplate: '<div class="ui-grid-cell-contents"><span>Age 2:{{COL_FIELD}}</span></div>' },
			{ name:'Is Active',field:'isActive', width:150, type:'boolean' },
			{ name:'Join Date',field:'registered', cellFilter:'date', width:150, type:'date', enableFiltering:false },
			{ name:'Month Joined',field:'registered', cellFilter: 'date:"MMMM"', filterCellFiltered:true, sortCellFiltered:true, width:150, type:'date' }
			*/
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


			var timeout = $timeout(function() {
				$interval.cancel(sec);
				$scope.left = '';
			}, 2000);

			$scope.$on('$destroy', function(){
				$timeout.cancel(timeout);
				$interval.cancel(sec);
			});

		};

	}]);