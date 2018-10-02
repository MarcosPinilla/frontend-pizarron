(function () {
    'use strict';
  
    angular
    .module('app')
    .service('OrientacionService', orientacionService);
  
    orientacionService.$inject = ['$resource', 'API'];
  
    function orientacionService ($resource, API) {
      return $resource(API + 'orientaciones/:id', {id: '@id'}, {
        update: {
          method: 'PUT'
        }
      });
    }
  })();