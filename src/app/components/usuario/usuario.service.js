(function () {
  'use strict';

  angular
    .module('app')
    .service('UsuarioService', usuarioService);

  usuarioService.$inject = ['$resource', 'API'];

  function usuarioService($resource, API) {
    return $resource(API + 'usuarios/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
