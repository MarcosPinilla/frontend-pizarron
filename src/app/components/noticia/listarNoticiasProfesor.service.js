(function () {
	'use strict';

	angular
	.module('app')
	.service('ListarNoticiasProfesorService', listarnoticiasprofesorService);

	listarnoticiasprofesorService.$inject = ['$resource', 'API'];

	function listarnoticiasprofesorService($resource, API){
		return $resource(API + 'obtenerNoticiasProfesor');
	}
})();