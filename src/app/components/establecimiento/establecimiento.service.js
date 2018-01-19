(function () {
  'use strict';

  angular
  .module('app')
  .service('EstablecimientoService', establecimientoService);

  establecimientoService.$inject = ['$resource', 'API'];

  function establecimientoService ($resource, API) {
    return $resource(API + 'establecimientos/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();