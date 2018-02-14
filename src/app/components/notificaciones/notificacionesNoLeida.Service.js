(function () {
  'use strict';

  angular
  .module('app')
  .service('NotificacionesNoLeidasService', notificacionesNoLeidasService);

  notificacionesNoLeidasService.$inject = ['$resource', 'API'];

  function notificacionesNoLeidasService($resource, API){
    return $resource(API + 'getNotificaciones', {id: '@id'}, {
    	  get: {
        isArray: true
      }
    	
    });
  }
})();