(function () {
	'use strict';

	angular
	.module('app')
	.service('ListarAvisosService', listaravisosService);

	listaravisosService.$inject = ['$resource', 'API'];

	function listaravisosService($resource, API){
		return $resource(API + 'obtenerAvisos');
	}
})();