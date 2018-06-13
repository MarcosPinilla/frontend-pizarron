(function () {
  'use strict';

  angular
  .module('app')
  .service('UpdateVisibilidadService', updateVisibilidadService);

  updateVisibilidadService.$inject = ['$resource', 'API'];

  function updateVisibilidadService ($resource, API) {
    return $resource(API + 'updateVisibilidad/:id', {id: '@id'}, {
    	 update: {
        method: 'PUT'
      }
    });
  }
})();