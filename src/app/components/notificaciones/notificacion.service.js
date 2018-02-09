(function () {
  'use strict';

  angular
  .module('app')
  .service('NotificacionService', notificacionService);

  notificacionService.$inject = ['$resource', 'API'];

  function notificacionService($resource, API){
    return $resource(API + 'notificaciones');
  }
})();