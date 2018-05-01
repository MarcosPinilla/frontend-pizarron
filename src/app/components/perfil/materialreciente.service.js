(function () {
  'use strict';

  angular
  .module('app')
  .service('MaterialRecientelService', materialrecienteService);

  materialrecienteService.$inject = ['$resource', 'API'];

  function materialrecienteService($resource, API){
    return $resource(API + 'obtenerMaterialReciente/:id', {id: '@id'}, {
    	get: {
    		isArray: true
    	}
    });
    }
})();