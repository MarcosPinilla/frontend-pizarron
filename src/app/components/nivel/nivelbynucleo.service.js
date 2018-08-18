(function () {
    'use strict';
  
    angular
    .module('app')
    .service('NivelByNucleoService', nivelByNucleoService);
  
    nivelByNucleoService.$inject = ['$resource', 'API'];
  
    function nivelByNucleoService ($resource, API) {
      return $resource(API + 'listarnivelesbynucleo/:id', {id: '@id'}, {
        update: {
          method: 'PUT'
        }
      });
    }
  })();