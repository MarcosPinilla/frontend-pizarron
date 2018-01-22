(function () {
	'use strict';

	angular
	.module('app')
	.service('ListarnivelesService', listarnivelesService);

	listarnivelesService.$inject = ['$resource', 'API'];

	function listarnivelesService($resource, API){
		return $resource(API + 'listarniveles');
	}
})();