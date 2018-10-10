(function () {
    'use strict'
  
    angular
    .module('app')
    .service('EducadoraService', educadoraService);
  
    educadoraService.$inject = ['$resource', 'API'];
  
    function educadoraService($resource, API) {
      return $resource(API + 'registromarco2');
    } 
  })();
  