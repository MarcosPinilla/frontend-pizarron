(function () {
    'use strict';
  
    angular
    .module('app')
    .service('PlanificacionPerfilService', planificacionPerfilService);
  
    planificacionPerfilService.$inject = ['$resource', 'API'];
  
    function planificacionPerfilService ($resource, API) {
      return $resource(API + 'getplanificacionesofprofesor/:id', {id: '@id'}, {
        update: {
          method: 'PUT'
        }
      });
    }
})();