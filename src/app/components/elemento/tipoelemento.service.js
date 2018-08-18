(function () {
    'use strict';
  
    angular
    .module('app')
    .service('TipoElementoService', tipoElementoService);
  
    tipoElementoService.$inject = ['$resource', 'API'];
  
    function tipoElementoService ($resource, API) {
      return $resource(API + 'tiposelementos');
    }
  })();