(function () {
    'use strict'
  
    angular
    .module('app')
    .service('RegisterService', registerService);
  
    registerService.$inject = ['$resource', 'API'];
  
    function registerService($resource, API) {
      return $resource(API + 'registroMarco');
    } 
  })();
  