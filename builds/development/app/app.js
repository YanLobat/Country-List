(function () {
	'use strict';
	angular
		.module('countriesList', [
				'ngRoute',
				'ui.router',
				'countriesList.home',
				'countriesList.country',
				'countriesList.region'
				])
		.config(Config);
		Config.$inject = ['$routeProvider','$locationProvider','$logProvider','$httpProvider'];
		//общий конфиг приложения
		function Config($routeProvider, $locationProvider, $logProvider, $httpProvider) {
				$routeProvider.
					otherwise({redirectTo: '/'});
				$locationProvider.html5Mode(true);//возможность убрать # в url Благодаря html5 тегу base в секции head
				$logProvider.debugEnabled(true); //включение дебага в нашем приложениии
		}
})();