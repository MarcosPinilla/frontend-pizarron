(function () {
	'use strict';

	angular
	.module('app')
	.service('LoginService', loginService);

	loginService.$inject = ['$resource', 'API'];

	function loginService($resource, API){
		return $resource(API + 'login');
	}
})();