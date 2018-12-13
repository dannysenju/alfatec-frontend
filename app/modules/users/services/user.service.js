(function() {
	'use strict';

	angular.module('test.users').service('UserService',
			[ 'DataFactory', function(dataFactory) {
				// Return object service
				return {
					/**
					 *  service of initial data taken from a json
					 */
					initData: function () {
						return dataFactory.initData();
					},
					/**
					 *  service of put updated info in the list
					 * @param {*} list
					 */
					setUserList: function(list) {
						dataFactory.setUserList(list);
					},
					/**
					 *  service of get the whole list
					 *
					 */
					getUserList: function() {
						return dataFactory.getUserList();
					},
					/**
					 *  service of  get profession for form create user
					 * @param {*} index
					 */
					getProfession: function(index) {
						return dataFactory.getProfession(index);
					},
					/**
					 * service of delete all users with a doctor's profession
					 *
					 */
					deleteAllDoctors: function() {
						var listDoctors = [];
						var listAll = dataFactory.getUserList();
						listAll.forEach(function(object, idx){
							if(object.personType == 'PRO' && object.professionalType == "1")
								listDoctors.push(idx);
						});

						for (var i = listDoctors.length -1; i >= 0; i--)
							listAll.splice(listDoctors[i],1);

						dataFactory.setUserList(listAll);
					},
					/**
					 *  service of add an item to the list
					 * @param {*} item
					 */
					add: function(user){
						dataFactory.add(user);
					},
					/**
					 *  service of delete an item to the list
					 * @param {*} item
					 */
					remove: function(user){
						dataFactory.remove(user);
					},
					/**
					 *  service of modify an item to the list
					 * @param {*} item
					 */
					edit: function(user){
						dataFactory.modify(user);
					}

				};
	}]);
})();
