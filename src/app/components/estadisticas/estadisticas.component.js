(function () {
	'use strict';

	angular
  	.module('app')
  	.component('estadisticas', {
    	templateUrl: 'app/components/estadisticas/estadisticas.html',
    	controller: estadisticasCtrl,
    	controllerAs: 'vm'
  	});

  	estadisticasCtrl.$inject = ['ProfesorService', 'SuscripcionService', 'MaterialService', 'ElementoService', 'OrientacionService', 'EstablecimientoService', 'EtiquetaService', 'ListarActualizacionesService','MaterialAnexoService'];

  	function estadisticasCtrl(ProfesorService, SuscripcionService, MaterialService, ElementoService, OrientacionService, EstablecimientoService, EtiquetaService, ListarActualizacionesService, MaterialAnexoService) {
      var vm = this;
      
      vm.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
      vm.data = [300, 500, 100];


      SuscripcionService.query().$promise.then(function (data) {
        vm.suscripciones = data;
      });

      MaterialAnexoService.query().$promise.then(function (data) {
        vm.materialesanexos = data;
        });

      ProfesorService.query().$promise.then(function (data) {
      vm.profesores = data;
      });

      MaterialService.query().$promise.then(function (data) {
      vm.materiales = data;
      });

      EtiquetaService.query().$promise.then(function (data) {
      vm.etiquetas = data;
      });

      ElementoService.query().$promise.then(function (data) {
      vm.elementos = data;
      });

      OrientacionService.query().$promise.then(function (data) {
      vm.orientaciones = data;
      });

      EstablecimientoService.query().$promise.then(function (data) {
      vm.establecimientos = data;
      });

      ListarActualizacionesService.query().$promise.then(function (data) {
        vm.actualizaciones = data;
      });

  	}
})();