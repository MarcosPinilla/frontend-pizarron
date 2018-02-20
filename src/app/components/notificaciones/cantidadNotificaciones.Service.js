(function () {
  'use strict';

  angular
  .module('app')
  .service('CantidadNotificaciones', cantidadNotificaciones);

  cantidadNotificaciones.$inject = ['$resource', 'API'];

  function cantidadNotificaciones($resource, API){
    return $resource(API + 'cantidadNotificaciones', {id: '@id'}, {
   
    	
    });
  }
})();