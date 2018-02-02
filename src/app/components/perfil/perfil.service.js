
(function () {
  'use strict'

  angular
  .module('app')
  .service('PerfilService', perfilService);

  perfilService.$inject = ['$resource', 'API'];

  function perfilService($resource, API) {
    return $resource(API + 'getLoggedUser');
  }
})();
