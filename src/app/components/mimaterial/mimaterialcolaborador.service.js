(function () {
  'use strict';

  angular
  .module('app')
  .service('ObtenerMiMaterialColaboradorService', obtenermimaterialColaboradorService);

  obtenermimaterialColaboradorService.$inject = ['$resource', 'API'];

  function obtenermimaterialColaboradorService($resource, API){
    return $resource(API + 'getMaterialProfesorColaborador');
    }
})();