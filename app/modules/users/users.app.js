(function(angular) {
	'use strict';

	var users = angular.module('test.users', [ 'ui.router']);

	users.config([ '$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {

			$stateProvider.state('home.users', {
				url : '/users',
				templateUrl : '/app/modules/users/templates/users.html',
				controller:'usersController'
			}).state('home.users.manage',{
				url : '/create',
				templateUrl : '/app/modules/users/templates/create-user.html',
				controller:'usersController',
				params: {
						isNew:true
				}
			}).state('home.users.edit',{
					url : '/:userId',
					controller:'usersController',
					templateUrl:'/app/modules/users/templates/create-user.html',
					params: {
						isNew:false
					}
			});
	}]);

})(angular);
