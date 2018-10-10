(function () {
    'use strict';
  
    angular
    .module('app')
    .service('RolService', rolService);
  
    rolService.$inject = ['$resource', 'API'];
  
    function rolService ($resource, API) {
      return $resource(API + 'roles/:id', {id: '@id'}, {
        update: {
          method: 'PUT'
        }
      });
    }
})();