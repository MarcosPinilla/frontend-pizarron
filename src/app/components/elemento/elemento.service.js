(function () {
  'use strict';

  angular
  .module('app')
  .service('ElementoService', elementoService);

  elementoService.$inject = ['$resource', 'API'];

  function elementoService ($resource, API) {
    return $resource(API + 'elementos/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();