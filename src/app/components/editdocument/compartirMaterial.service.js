(function () {
	'use strict';

	angular
	.module('app')
	.service('compartirMaterialService', compartirMaterialService);

	compartirMaterialService.$inject = ['$resource', 'API'];

	function compartirMaterialService($resource, API){
		return $resource(API + 'compartirMaterial', {
      	save: {
        	method: 'POST'
      }
    });
  }
})();