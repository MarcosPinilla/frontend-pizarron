(function () {
  'use strict';

  angular
  .module('app')
  .service('ActualizarMaterialService', actualizarMaterialService);

  actualizarMaterialService.$inject = ['$resource', 'API'];

  function actualizarMaterialService ($resource, API) {
    return $resource(API + 'actualizarContenidoMaterial/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();