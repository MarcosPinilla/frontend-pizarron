(function () {
  'use strict';

  angular
  .module('app')
  .service('ComunaService', comunaService);

  comunaService.$inject = ['$resource', 'API'];

  function comunaService ($resource, API) {
    return $resource(API + 'comunas/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();