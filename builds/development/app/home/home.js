;(function() {
  'use strict';
  	angular
	    .module('countriesList.home', ['ui.router'])
		.config(route)
		.controller('HomeController', HomeController)
		.filter('split', function() {
	        return function(input, splitChar, splitIndex) {
	            // do some bounds checking here to ensure it has that index
	            return input.split(splitChar)[splitIndex];
	        }
	    });

  	route.$inject = ['$stateProvider'];
  	HomeController.$inject = ['$scope','$rootScope','$http'];
	function route($stateProvider) {
		$stateProvider
		  .state('home', {
		    url: '/',
		    templateUrl: 'app/home/home.html',
		    controller: 'HomeController',
		    controllerAs: 'vm'
		  });
	}

	function HomeController($scope, $rootScope, $http) {
	  	var vm = this;
	  	vm.sparql = `
			SELECT DISTINCT ?country ?countryLabel ?capital ?capitalLabel
			WHERE
			{
			  ?country wdt:P31 wd:Q3624078 .
			  FILTER NOT EXISTS {?country wdt:P31 wd:Q3024240}.

			  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
			}
			ORDER BY ?countryLabel
		`;

		vm.countries = [];

	    vm.init = function() {
	      	$http({
			  method: 'GET',
			  url: 'https://query.wikidata.org/sparql?query='+vm.sparql
			}).then(function successCallback(response) {
				vm.countries = response.data.results.bindings;
				console.log(vm.countries);
			    // this callback will be called asynchronously
			    // when the response is available
			  }, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			    alert('error while request!');
			});
	    }
	    vm.init();
	}
})();