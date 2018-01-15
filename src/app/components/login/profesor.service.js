(function (){
	'use strict';

	angular
	.module('app')
	.service('ProfesorService', profesorService);

	profesorService.$inject = ['$resource', 'API'];

	function profesorService($resource, API) {
		return $resource(API + 'profesor')
	}
})();