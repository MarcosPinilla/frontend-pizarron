(function () {
	'use strict';

	angular
	.module('app')
	.service('ObtenerElementosService', obtenerElementosService);

	obtenerElementosService.$inject = ['$resource', 'API'];

  function obtenerElementosService($resource, API){
    return $resource(API + 'obtenerElementos/:id', {id: '@id'}, {
    	get: {
    		isArray: true
    	}
    });
  }
})();
