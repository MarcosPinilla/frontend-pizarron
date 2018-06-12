(function () {
	'use strict';

	angular
	.module('app')
	.service('SeguidoresService', seguidoresService);

	seguidoresService.$inject = ['$resource', 'API'];

	function seguidoresService($resource, API){
		return $resource(API + 'getSeguidoresProfesor');
	}
})();