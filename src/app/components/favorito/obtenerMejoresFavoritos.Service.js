(function () {
  'use strict'

  angular
  .module('app')
  .service('ObtenerMejoresFavoritos', obtenerMejoresFavoritos);

  obtenerMejoresFavoritos.$inject = ['$resource', 'API'];

  function obtenerMejoresFavoritos($resource, API) {
    return $resource(API + 'getMasFavoritoProfesor/:id', {id: '@id'}, {
      get: {
        isArray: true
      }
    });
  }
})();
