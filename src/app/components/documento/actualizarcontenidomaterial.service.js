(function () {
	'use strict';

	angular
	.module('app')
	.service('ActualizarContenidoMaterialService', actualizarcontenidomaterialService);

	actualizarcontenidomaterialService.$inject = ['$resource', 'API'];

	function actualizarcontenidomaterialService($resource, API){
		return $resource(API + 'actualizarContenidoMaterial/:id', {id: '@id'}, {
      	update: {
        	method: 'PUT'
      }
    });
  }
})();