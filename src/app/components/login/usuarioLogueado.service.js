(function () {
	'use strict';

	angular
	.module('app')
	.service('ObtenerUsuario', obtenerUsuario);

	obtenerUsuario.$inject = ['$resource', 'API'];

	function obtenerUsuario($resource, API) {
		return $resource(API + 'profesor');
	}
})