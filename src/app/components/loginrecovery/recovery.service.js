(function () {
	'use strict';

	angular
	.module('app')
	.service('RecoveryService', recoveryService);

	recoveryService.$inject = ['$resource', 'API'];

	function recoveryService($resource, API){
		return $resource(API + 'resetpassword');
	}
})();