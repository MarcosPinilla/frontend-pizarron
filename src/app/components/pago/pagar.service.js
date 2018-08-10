(function () {
    'use strict';
  
    angular
    .module('app')
    .service('PagarService', pagarService);
  
    pagarService.$inject = ['$resource', 'API'];
  
    function pagarService ($resource, API) {
      return $resource(API + 'contrato/:id/pagar', {id: '@id'}, {
        update: {
          method: 'PUT'
        }
      });
    }
  })();