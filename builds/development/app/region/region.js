;(function() {
  'use strict';
  	angular
	    .module('countriesList.region', ['ui.router'])
		.config(route)
		.controller('RegionController', RegionController);

  	route.$inject = ['$stateProvider'];
  	RegionController.$inject = ['$scope','$rootScope','$http', '$state', '$stateParams',];
	function route($stateProvider) {
		$stateProvider
		  .state('region', {
		    url: '/region/:id',
		    templateUrl: 'app/region/region.html',
		    controller: 'RegionController',
		    controllerAs: 'vm'
		  });
	}

	function RegionController($scope, $rootScope, $http, $state, $stateParams) {
	  	const vm = this;
		vm.region = {};
		vm.regionDetail = function() {
			vm.regionsparql = `
				SELECT DISTINCT ?regionLabel ?citiesLabel

				{
				  ?cities wdt:P131 wd:Q16123 .
                  ?cities wdt:P131 ?region .
				  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
				}
			`;
			$http({
			  method: 'GET',
			  url: 'https://query.wikidata.org/sparql?query='+vm.regionsparql
			}).then(function successCallback(response) {
				vm.region.title = response.data.results.bindings[0].regionLabel.value;
				vm.region.cities = response.data.results.bindings;
				console.log(vm.region.cities);
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
	    		vm.regionDetail();
			}
	    };
	    vm.init();
	}
})();