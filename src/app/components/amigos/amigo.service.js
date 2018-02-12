(function () {
  'use strict';

  angular
  .module('app')
  .service('AmigoService', amigoService);

  amigoService.$inject = ['$resource', 'API'];

  function amigoService ($resource, API) {
    return $resource(API + 'amigos/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();