(function () {
    'use strict';
  
    angular
    .module('app')
    .service('ObtenerMiPlanificacionService', obtenermiplanificacionService);
  
    obtenermiplanificacionService.$inject = ['$resource', 'API'];
  
    function obtenermiplanificacionService($resource, API){
      return $resource(API + 'getplanificacionprofesor');
      }
  })();