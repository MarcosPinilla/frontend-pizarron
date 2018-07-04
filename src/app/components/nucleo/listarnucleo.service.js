(function () {
	'use strict';

	angular
	.module('app')
	.service('ListarnucleosService', listarnucleosService);

	listarnucleosService.$inject = ['$resource', 'API'];

	function listarnucleosService($resource, API){
		return $resource(API + 'listarnucleos');
	}
})();