(function () {
	'use strict';

	angular
	.module('app')
	.service('AgregarColaboradorService', agregarcolaboradorService);

	agregarcolaboradorService.$inject = ['$resource', 'API'];

	function agregarcolaboradorService($resource, API){
		return $resource(API + 'agregarColaborador', {
      	save: {
        	method: 'POST'
      }
    });
  }
})();