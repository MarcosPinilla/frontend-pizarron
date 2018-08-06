(function () {
    'use strict';
  
    angular
    .module('app')
    .service('ContratoService', contratoService);
  
    contratoService.$inject = ['$resource', 'API'];
  
    function contratoService ($resource, API) {
      return $resource(API + 'contratoUsuario');
    }
  })();