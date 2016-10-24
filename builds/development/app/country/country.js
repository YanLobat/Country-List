;(function() {
  'use strict';
  	angular
	    .module('countriesList.country', ['ui.router'])
		.config(route)
		.controller('CountryController', CountryController)
		.filter('split', function() {
	        return function(input, splitChar, splitIndex) {
	            // do some bounds checking here to ensure it has that index
	            return input.split(splitChar)[splitIndex];
	        }
	    });

  	route.$inject = ['$stateProvider'];
  	CountryController.$inject = ['$scope','$rootScope','$http', '$state', '$stateParams',];
	function route($stateProvider) {
		$stateProvider
		  .state('country', {
		    url: '/country/:id',
		    templateUrl: 'app/country/country.html',
		    controller: 'CountryController',
		    controllerAs: 'vm'
		  });
	}

	function CountryController($scope, $rootScope, $http, $state, $stateParams) {
	  	const vm = this;
		vm.country = {};
		vm.regionsDetail = function() {
			vm.regionssparql = `
				SELECT DISTINCT ?reg ?regLabel
				{
				  ?country wdt:P131 ?region .
                  ?country wdt:P150 ?reg .
				  ?country wdt:P17 wd:Q38 .
                  ?reg wdt:P36 ?capital .
				  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
				}
				ORDER BY ?countryLabel
			`;
			$http({
			  method: 'GET',
			  url: 'https://query.wikidata.org/sparql?query='+vm.regionssparql
			}).then(function successCallback(response) {
				vm.country.regions = response.data.results.bindings;
				console.log(vm.country.regions);
			    // this callback will be called asynchronously
			    // when the response is available
			  }, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			    console.log(response);
			});
		};
		vm.bordersDetail = function() {
			vm.borderssparql = `
				SELECT DISTINCT ?bordersLabel
				{
				  ?country wdt:P31 wd:Q3624078 .
				  ?country wdt:P17 wd:${$stateParams.id} .
				  ?country wdt:P47 ?borders .
				  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
				}
			`;
			$http({
			  method: 'GET',
			  url: 'https://query.wikidata.org/sparql?query='+vm.borderssparql
			}).then(function successCallback(response) {
				vm.country.borders = response.data.results.bindings;
				vm.regionsDetail();
			    // this callback will be called asynchronously
			    // when the response is available
			  }, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			    console.log(response);
			});
		};
		vm.countryDetail = function() {
			vm.sparql = `
				SELECT DISTINCT ?flag ?bordersLabel ?langLabel ?countryLabel ?capitalLabel
				{
				  ?country wdt:P31 wd:Q3624078 .
				  ?country wdt:P41 ?flag .
				  ?country wdt:P37 ?lang .
				  ?country wdt:P36 ?capital .
				  ?country wdt:P17 wd:${$stateParams.id} .
				  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
				}
			`;
			// 					  ?country wdt:P47 ?borders .
	      	$http({
			  method: 'GET',
			  url: 'https://query.wikidata.org/sparql?query='+vm.sparql
			}).then(function successCallback(response) {
				vm.country = response.data.results.bindings[0];
				vm.bordersDetail();
			    // this callback will be called asynchronously
			    // when the response is available
			  }, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			    console.log(response);
			});
		};
	    vm.init = function() {
	    	if ($stateParams.id !== undefined) {
	    		vm.countryDetail();
			}
	    };
	    vm.init();
	}
})();