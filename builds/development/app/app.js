(function () {
	'use strict';
	angular
		.module('countriesList', [
				'ui.router'
				])
		.constant('FIREBASE_URL', "https://yanfit.firebaseio.com/")
		.config(Config);
		Config.$inject = ['$routeProvider','$locationProvider','$logProvider'];
		//общий конфиг приложения
		function Config($routeProvider,$locationProvider,$logProvider) {
				$routeProvider.
					otherwise({redirectTo: '/'});
				$locationProvider.html5Mode(true);//возможность убрать # в url Благодаря html5 тегу base в секции head
				$logProvider.debugEnabled(true); //включение дебага в нашем приложениии
		}
})();