(function () {
	'use strict';

	angular
	.module('app')
	.service('ListarambitosService', listarambitosService);

	listarambitosService.$inject = ['$resource', 'API'];

	function listarambitosService($resource, API){
		return $resource(API + 'listarambitos');
	}
})();