(function () {
  'use strict'

  angular
  .module('app')
  .service('BuscarNombreProfesorService', buscarNombreProfesorService);

  buscarNombreProfesorService.$inject = ['$resource', 'API'];

  function buscarNombreProfesorService($resource, API) {
    return $resource(API + 'buscarProfesorPorNombre/:nombre', {nombre: '@nombre'}, {
      get: {
        isArray: true
      }
    });
  }
})();
