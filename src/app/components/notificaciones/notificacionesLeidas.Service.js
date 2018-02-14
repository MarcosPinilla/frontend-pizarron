(function () {
  'use strict';

  angular
  .module('app')
  .service('NotificacionesLeidasService', notificacionesLeidasService);

  notificacionesLeidasService.$inject = ['$resource', 'API'];

  function notificacionesLeidasService($resource, API){
    return $resource(API + 'getNotificacionesLeidas', {id: '@id'}, {
    	  get: {
        isArray: true
      }
    	
    });
  }
})();