(function(angular) {
	'use strict';
	var users = angular.module('test.users');

	users.controller('usersController', [
			'$scope',
			'$state',
			'$stateParams',
			'UserService',
			'ngDialog',
			function($scope, $state, $stateParams, userService, ngDialog) {

				// list of users
				$scope.users = [];
				// boolean that indicates whether you are going to edit or create 
				$scope.isCreate = false;
				$scope.isEdit = $stateParams.isNew;
				$scope.newUser = {};

				/**
				 * get list of users in JSON
				 *
				 */
				$scope.getUsers = function() {
					userService.initData().then(
						function(success) {
							$scope.users = success;
							userService.setUserList($scope.users);
						}
					);
				}

				/**
				 * invoke at the beginning the load of the list
				 *
				 */
				this.init = function() {
					$scope.getUsers();
				}

				this.init();

				/**
				 * delete a user to the list
				 * @param {*} user
				 */
				$scope.delete = function(user) {
					$scope.message = 'Are you sure you want to delete?';
					ngDialog.openConfirm({
						template: '/app/modules/global/templates/confirm-dialog.html',
						scope : $scope,
						className: 'ngdialog-theme-default confirm-dialog'
						}).then(function (value) {
							userService.remove(user);
							$scope.getUsers = userService.getUserList();
						}, function (reason) {
							$scope.goBack();
						});
				}
				/**
				 * go to state create user, and set the form to create a user
				 *
				 */
				$scope.addUser = function() {
					$scope.isCreate = true;
					$state.go("home.users.manage");
				}
				/**
				 * go to state edit user, and set the form to modify a user
				 * @param {*} user
				 */
				$scope.editUser = function(user) {
					$scope.isCreate = true;
					$scope.isEdit = true;
					$scope.newUser = user;
					$state.go('home.users.edit', {
						userId : user.nif
					});
				}

				/**
				 * delete all users with a doctor's profession
				 *
				 */
				$scope.deleteDoctor = function() {
					$scope.message = 'Are you sure you want to delete?';
					ngDialog.openConfirm({
						template: '/app/modules/global/templates/confirm-dialog.html',
						scope : $scope,
						className: 'ngdialog-theme-default confirm-dialog'
						}).then(function (value) {
							userService.deleteAllDoctors();
							$scope.getUsers = userService.getUserList();
						}, function (reason) {
							$scope.goBack();
						});
				}

				/**
				 * see all the details of a user
				 * @param {*} user
				 */
				$scope.seeDetails = function(user){
					$scope.userDetail = user;
					$scope.message = 'Detail User';
					ngDialog.openConfirm({
						template: '/app/modules/users/templates/user-detail.html',
						scope : $scope,
						className: 'ngdialog-theme-default'
						}).then(function (value) {
						}, function (reason) {
								$scope.goBack();
						});

				}
				/**
				 * get from a list the professions to be loaded in the combo of the creation form
				 * @param {*} idx
				 */
				$scope.getProfession = function(idx) {
					return userService.getProfession(idx);
				}

				/**
				 * Save or update a user depending on the selected option
				 * @param {*} user
				 */
				$scope.save = function(user) {
					if (!user.name && !user.surName) {
						return;
					}else{
						if($scope.isEdit){
							userService.edit(user);
						}else{
							userService.add(user);
						}
							$scope.goBack();
					}
				}

				/**
				 * return to the initial state
				 *
				 */
				 $scope.goBack = function () {
					$scope.isCreate = false;
					$scope.isEdit = false;
					$scope.newUser = {};
					$state.go("home");
					$scope.getUsers = userService.getUserList();
				}

			}]);
})(angular);
