(function () {
	'use strict';

	angular
	.module('app')
	.service('eliminarColaboradorMaterialService', eliminarColaboradorMaterialService);

	eliminarColaboradorMaterialService.$inject = ['$resource', 'API'];

	function eliminarColaboradorMaterialService($resource, API){
		return $resource(API + 'eliminarColaboradorMaterial', {
      	delete: {
        	method: 'DELETE'
      }
    });
  }
})();