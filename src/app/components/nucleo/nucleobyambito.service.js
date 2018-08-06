(function () {
    'use strict';
  
    angular
    .module('app')
    .service('NucleoByAmbitoService', nucleoByAmbitoService);
  
    nucleoByAmbitoService.$inject = ['$resource', 'API'];
  
    function nucleoByAmbitoService ($resource, API) {
      return $resource(API + 'listarnucleosbyambito/:id', {id: '@id'}, {
        update: {
          method: 'PUT'
        }
      });
    }
  })();