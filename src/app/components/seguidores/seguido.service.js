(function () {
	'use strict';

	angular
	.module('app')
	.service('SeguidoService', seguidoService);

	seguidoService.$inject = ['$resource', 'API'];

	function seguidoService($resource, API){
		return $resource(API + 'verificarSeguidoPor/:id', {id: '@id'}, {
            update: {
              method: 'PUT'
            }
        });
	}
})();