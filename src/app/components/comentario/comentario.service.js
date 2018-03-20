(function () {
  'use strict';

  angular
  .module('app')
  .service('ComentarioService', comentarioService);

  comentarioService.$inject = ['$resource', 'API'];

  function comentarioService ($resource, API) {
    return $resource(API + 'comentarios/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();