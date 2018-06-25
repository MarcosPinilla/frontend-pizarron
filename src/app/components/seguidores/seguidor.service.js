(function () {
	'use strict';

	angular
	.module('app')
	.service('SeguidorService', seguidorService);

	seguidorService.$inject = ['$resource', 'API'];

	function seguidorService($resource, API){
		return $resource(API + 'verificarSeguidorDe/:id', {id: '@id'}, {
            update: {
              method: 'PUT'
            }
        });
	}
})();