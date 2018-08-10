(function () {
    'use strict';
  
    angular
    .module('app')
    .service('ActualizarPlanificacionService', actualizarPlanificacionService);
  
    actualizarPlanificacionService.$inject = ['$resource', 'API'];
  
    function actualizarPlanificacionService ($resource, API) {
      return $resource(API + 'actualizarplanificacion/:id', {id: '@id'}, {
        update: {
          method: 'PUT'
        }
      });
    }
})();