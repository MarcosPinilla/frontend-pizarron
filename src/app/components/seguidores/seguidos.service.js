(function () {
	'use strict';

	angular
	.module('app')
	.service('SeguidosService', seguidosService);

	seguidosService.$inject = ['$resource', 'API'];

	function seguidosService($resource, API){
		return $resource(API + 'getSeguidosProfesor');
	}
})();