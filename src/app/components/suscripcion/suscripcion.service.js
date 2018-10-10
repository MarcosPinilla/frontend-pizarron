(function () {
    'use strict';
  
    angular
    .module('app')
    .service('SuscripcionService', suscripcionService);
  
    suscripcionService.$inject = ['$resource', 'API'];
  
    function suscripcionService ($resource, API) {
      return $resource(API + 'suscripciones/:id', {id: '@id'}, {
        update: {
          method: 'PUT'
        }
      });
    }
})();