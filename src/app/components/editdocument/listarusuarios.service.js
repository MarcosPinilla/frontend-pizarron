(function () {
	'use strict';

	angular
	.module('app')
	.service('ListarusuariosService', listarusuariosService);

	listarusuariosService.$inject = ['$resource', 'API'];

	function listarusuariosService($resource, API){
		return $resource(API + 'listarusuarios');
	}
})();