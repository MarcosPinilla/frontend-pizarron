(function () {
	'use strict';

	angular
	.module('app')
	.service('validarColaboradorService', validarColaboradorService);

	validarColaboradorService.$inject = ['$resource', 'API'];

	function validarColaboradorService($resource, API) {
    return $resource(API + 'validarColaboradorMaterial/:id', {id: '@id'}, {
      get: {
        isArray: true
      }
    });
  }
})();