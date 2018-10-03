(function () {
    'use strict';
  
    angular
    .module('app')
    .service('MaterialAnexoService', materialanexoService);
  
    materialanexoService.$inject = ['$resource', 'API'];
  
    function materialanexoService ($resource, API) {
      return $resource(API + 'materialesanexos/:id', {id: '@id'}, {
        update: {
          method: 'PUT'
        }
      });
    }
  })();