(function () {
	'use strict';

	angular
	.module('app')
	.service('ListarActualizacionesService', listarActualizacionesService);

	listarActualizacionesService.$inject = ['$resource', 'API'];

	function listarActualizacionesService($resource, API){
		return $resource(API + 'obtenerActualizaciones');
	}
})();