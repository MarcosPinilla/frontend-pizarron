(function () {
  'use strict';

  angular
  .module('app')
  .service('CambiarNotificacionesLeidas', cambiarNotificacionesLeidas);

  cambiarNotificacionesLeidas.$inject = ['$resource', 'API'];

  function cambiarNotificacionesLeidas($resource, API){
    return $resource(API + 'changeRead', {id: '@id'}, {
    	  get: {
        isArray: true
      }
    	
    });
  }
})();