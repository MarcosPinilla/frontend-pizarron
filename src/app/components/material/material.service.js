(function () {
  'use strict';

  angular
  .module('app')
  .service('MaterialService', materialService);

  materialService.$inject = ['$resource', 'API'];

  function materialService ($resource, API) {
    return $resource(API + 'materiales/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();