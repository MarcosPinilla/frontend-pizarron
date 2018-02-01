(function () {
  'use strict'

  angular
  .module('app')
  .service('obtenerMaterialProfesor', obtenerMaterialProfesor);

  obtenerMaterialProfesor.$inject = ['$resource', 'API'];

  function obtenerMaterialProfesor($resource, API) {
    return $resource(API + 'getMaterialProfesor', {id: '@id'}, {
      get: {
        isArray: true
      }
    });
  }
})();
