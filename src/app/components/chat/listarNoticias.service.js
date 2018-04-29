(function () {
	'use strict';

	angular
	.module('app')
	.service('ListarNoticiasService', listarnoticiasService);

	listarnoticiasService.$inject = ['$resource', 'API'];

	function listarnoticiasService($resource, API){
		return $resource(API + 'obtenerNoticias');
	}
})();