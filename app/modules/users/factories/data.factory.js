/* global google */
(function() {
	'use strict';

	var module = angular.module('test.users');

	function dataFactory($q, $http ) {

		let listUser = [];
		let professions = ['doctor', 'nurse', 'adminstrator', 'contractor'];
		/**
		 * initial data taken from a json
		 */
		function initData(){
			var defered = $q.defer();
			var promise = defered.promise;
			$http.get('/data/users.json')
				.success(function(data) {
					listUser = data;
					defered.resolve(listUser);
				})
				.error(function(err) {
					defered.reject(err)
				});
			return promise;
		}

		/**
		 * add an item to the list
		 * @param {*} item
		 */
		function add(item){

			listUser.push(item);
		}

		/**
		 * delete an item to the list
		 * @param {*} item
		 */
		function remove(item){
			var idx = listUser.indexOf(item);
			listUser.splice(idx, 1);
		}
		/**
		 * modify an item to the list
		 * @param {*} item
		 */
		function modify(item){
			var idx = listUser.indexOf(item);
			listUser[idx] = item;
		}

		/**
		 * get the whole list
		 *
		 */
		function getUserList(){
			return listUser;
		}
		/**
		 * put updated info in the list
		 * @param {*} list
		 */
		function setUserList(list){
			listUser = list;
		}
		/**
		 * get profession for form create user
		 * @param {*} index
		 */
		function getProfession(index){
			return professions[ index - 1 ];
		}

		// Return object service
		return {
			initData: initData,
			add : add,
			remove: remove,
			modify: modify,
			getUserList: getUserList,
			setUserList: setUserList,
			getProfession: getProfession
		};
		// return service
	}

	module.factory('DataFactory',
			[ '$q', '$http', dataFactory]);
})();
