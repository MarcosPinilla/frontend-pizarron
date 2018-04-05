(function () {
  'use strict';

  angular
  .module('app')
  .service('ObtenerMiMaterialService', obtenermimaterialService);

  obtenermimaterialService.$inject = ['$resource', 'API'];

  function obtenermimaterialService($resource, API){
    return $resource(API + 'getMaterialProfesor');
    }
})();