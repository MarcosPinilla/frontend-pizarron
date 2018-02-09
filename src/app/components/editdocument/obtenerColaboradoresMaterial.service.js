(function () {
  'use strict'

  angular
  .module('app')
  .service('obtenerColaboradoresMaterialService', obtenerColaboradoresMaterialService);

  obtenerColaboradoresMaterialService.$inject = ['$resource', 'API'];

  function obtenerColaboradoresMaterialService($resource, API) {
    return $resource(API + 'getColaboradoresMaterial/:id', {id: '@id'}, {
      get: {
        isArray: true
      }
    });
  }
})();
