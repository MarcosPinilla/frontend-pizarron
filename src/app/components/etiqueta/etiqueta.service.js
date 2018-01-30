(function () {
  'use strict';

  angular
  .module('app')
  .service('EtiquetaService', etiquetaService);

  etiquetaService.$inject = ['$resource', 'API'];

  function etiquetaService ($resource, API) {
    return $resource(API + 'etiquetas/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();