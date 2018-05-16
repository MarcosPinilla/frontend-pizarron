(function () {
  'use strict'

  angular
  .module('app')
  .service('obtenerSeguidoresProfesorService', obtenerSeguidoresProfesorService);

  obtenerSeguidoresProfesorService.$inject = ['$resource', 'API'];

  function obtenerSeguidoresProfesorService($resource, API) {
    return $resource(API + 'getSeguidoresProfesor', {
      get: {
        isArray: true
      }
    });
  }
})();
