(function () {
  'use strict';

  angular
  .module('app')
  .service('VisibilidadService', visibilidadService);

  visibilidadService.$inject = ['$resource', 'API'];

  function visibilidadService ($resource, API) {
    return $resource(API + 'visibilidades/:id', {id: '@id'}, {
    	 update: {
        method: 'PUT'
      }
    });
  }
})();