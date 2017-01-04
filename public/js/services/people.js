angular.module('peopleService', [])

	// super simple service
	// each function returns a promise object 
	.factory('people', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/people');
			},
			create : function(personData) {
				return $http.post('/api/people', personData);
			},
			delete : function(id) {
				return $http.delete('/api/people/' + id);
			}
		}
	}]);