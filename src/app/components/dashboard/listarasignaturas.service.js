(function () {
	'use strict';

	angular
	.module('app')
	.service('ListarasignaturasService', listarasignaturasService);

	listarasignaturasService.$inject = ['$resource', 'API'];

	function listarasignaturasService($resource, API){
		return $resource(API + 'listarasignaturas');
	}
})();