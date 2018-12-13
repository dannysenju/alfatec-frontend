(function() {
	'use strict';

	var testApp = angular.module('testApp', ['test.users',
								'ngResource', 'ui.router', 'ui.bootstrap', 'ngAnimate', 'ngDialog']);

	testApp.config(function( $stateProvider, $urlRouterProvider, $locationProvider ){

			$urlRouterProvider.otherwise('/home');

			$stateProvider
				.state('home', {
				  url: "/home",
				  redirectTo:"home.users"
				})
		});
})();
