(function () {
  'use strict'

  angular
  .module('app')
  .service('ObtenerFavoritosProfesor', obtenerFavoritosProfesor);

  obtenerFavoritosProfesor.$inject = ['$resource', 'API'];

  function obtenerFavoritosProfesor($resource, API) {
    return $resource(API + 'getFavoriteByTeacher', {id: '@id'}, {
      get: {
        isArray: true
      }
    });
  }
})();
