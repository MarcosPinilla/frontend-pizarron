(function () {
    'use strict';
  
    angular
    .module('app')
    .service('ContenidoPlanificacionService', contenidoPlanificacionService);
  
    contenidoPlanificacionService.$inject = ['$resource', 'API'];
  
    function contenidoPlanificacionService ($resource, API) {
      return $resource(API + 'getcontenidoplanificacion/:id', {id: '@id'}, {
        update: {
          method: 'PUT'
        }
      });
    }
})();