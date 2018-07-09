(function () {
  'use strict';

  angular
  .module('app')
  .service('AmbitoService', ambitoService);

  ambitoService.$inject = ['$resource', 'API'];

  function ambitoService ($resource, API) {
    return $resource(API + 'ambitos/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();