(function () {
  'use strict'

  angular
  .module('app')
  .service('DarFavorito', darFavorito);

  darFavorito.$inject = ['$resource', 'API'];

  function darFavorito($resource, API) {
    return $resource(API + 'giveLike', {id: '@id'}, {
      get: {
        isArray: true
      }
    });
  }
})();
