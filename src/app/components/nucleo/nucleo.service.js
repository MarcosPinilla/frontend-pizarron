(function () {
  'use strict';

  angular
  .module('app')
  .service('NucleoService', nucleoService);

  nucleoService.$inject = ['$resource', 'API'];

  function nucleoService ($resource, API) {
    return $resource(API + 'nucleos/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();