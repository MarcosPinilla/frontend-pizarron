(function () {
  'use strict';

  angular
  .module('app')
  .service('SexoService', sexoService);

  sexoService.$inject = ['$resource', 'API'];

  function sexoService ($resource, API) {
    return $resource(API + 'sexos/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();