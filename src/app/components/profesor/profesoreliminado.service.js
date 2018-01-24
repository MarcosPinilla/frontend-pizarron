(function () {
  'use strict';

  angular
  .module('app')
  .service('ProfesorEliminadoService', profesorEliminadoService);

  profesorEliminadoService.$inject = ['$resource', 'API'];

  function profesorEliminadoService ($resource, API) {
    return $resource(API + 'profesoreseliminados/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();