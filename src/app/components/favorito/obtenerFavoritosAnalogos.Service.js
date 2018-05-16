(function () {
  'use strict';

  angular
  .module('app')
  .service('ObtenerFavoritosAnalogosService', obtenerFavoritosAnalogosService);

  obtenerFavoritosAnalogosService.$inject = ['$resource', 'API'];

  function obtenerFavoritosAnalogosService($resource, API){
    return $resource(API + 'obtenerFavoritoProfesor');
    }
})();