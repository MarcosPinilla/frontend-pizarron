(function () {
  'use strict';

  angular
  .module('app')
  .service('TipoestablecimientoService', tipoestablecimientoService);

  tipoestablecimientoService.$inject = ['$resource', 'API'];

  function tipoestablecimientoService ($resource, API) {
    return $resource(API + 'tiposestablecimientos/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();