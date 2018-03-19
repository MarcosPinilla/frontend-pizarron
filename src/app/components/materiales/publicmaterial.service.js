(function () {
  'use strict';

  angular
  .module('app')
  .service('PublicMaterialService', publicmaterialService);

  publicmaterialService.$inject = ['$resource', 'API'];

  function publicmaterialService ($resource, API) {
    return $resource(API + 'publicos/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();