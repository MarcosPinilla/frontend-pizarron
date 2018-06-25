(function () {
  'use strict';

  angular
  .module('app')
  .service('ElementoService', elementoService);

  elementoService.$inject = ['$resource', 'API'];

  function elementoService ($resource, API) {
    return $resource(API + 'elementos/:id', {id: '@id'}, {
      get: {
        method: 'GET',
        headers: {
          'Content-Type': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
        }
      },
      update: {
        method: 'PUT'
      }
    });
  }
})();