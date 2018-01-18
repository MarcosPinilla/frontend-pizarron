(function () {
	'use strict';

	angular
	.module('app')
	.service('ListarprofesoresService', listarprofesoresService);

	listarprofesoresService.$inject = ['$resource', 'API'];

	function listarprofesoresService($resource, API){
		return $resource(API + 'listarprofesores');
	}
})();