angular.module('peopleController', [])

	.controller('mainController', ['$scope','$http','people', function($scope, $http, people) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// use the service to get all the people
		people.get()
			.success(function(data) {
				$scope.people = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createPerson = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.name != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				people.create($scope.formData)
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form
						$scope.people = data;
					});
			}
		};

		// DELETE ==================================================================
		$scope.deletePerson = function(id) {
			$scope.loading = true;

			people.delete(id)
				.success(function(data) {
					$scope.loading = false;
					$scope.people = data;
				});
		};
	}]);