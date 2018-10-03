(function () {
	'use strict';

	angular
	.module('app')
	.service('CompartirPlanificacionService', compartirPlanificacionService);

	compartirPlanificacionService.$inject = ['$resource', 'API'];

	function compartirPlanificacionService($resource, API){
		return $resource(API + 'compartirplanificacion', {
      	save: {
        	method: 'POST'
        }
    });
  }
})();