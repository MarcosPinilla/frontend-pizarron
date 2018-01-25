(function () {
	'use strict';

	angular
	.module('app')
	.service('ObtenerContenidoMaterialService', obtenercontenidomaterialService);

	obtenercontenidomaterialService.$inject = ['$resource', 'API'];

	function obtenercontenidomaterialService($resource, API){
		return $resource(API + 'materiales/:id', {id: '@id'});
  	}
})();