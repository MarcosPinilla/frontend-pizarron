(function () {
    'use strict';
  
    angular
    .module('app')
    .service('PdfPlanificacionService', pdfPlanificacionService);
  
    pdfPlanificacionService.$inject = ['$resource', 'API'];
  
    function pdfPlanificacionService ($resource, API) {
      return $resource(API + 'getpdfplanificacion/:id', {id: '@id'}, {
        update: {
          method: 'PUT'
        }
      });
    }
})();