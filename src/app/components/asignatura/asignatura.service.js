(function () {
  'use strict';

  angular
  .module('app')
  .service('AsignaturaService', asignaturaService);

  asignaturaService.$inject = ['$resource', 'API'];

  function asignaturaService ($resource, API) {
    return $resource(API + 'asignaturas/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();