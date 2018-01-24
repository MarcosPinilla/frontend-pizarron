(function () {
  'use strict';

  angular
  .module('app')
  .service('ObjetivoMineducService', objetivoMineducService);

  objetivoMineducService.$inject = ['$resource', 'API'];

  function objetivoMineducService ($resource, API) {
    return $resource(API + 'objetivosaprendizajemineduc/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
