(function () {
	'use strict';

	angular
	.module('app')
	.service('CompartirMaterialAnexoService', compartirMaterialAnexoService);

	compartirMaterialAnexoService.$inject = ['$resource', 'API'];

	function compartirMaterialAnexoService($resource, API){
		return $resource(API + 'compartiranexo', {
      	save: {
        	method: 'POST'
        }
    });
  }
})();