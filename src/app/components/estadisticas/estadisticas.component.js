(function () {
	'use strict';

	angular
  	.module('app')
  	.component('estadisticas', {
    	templateUrl: 'app/components/estadisticas/estadisticas.html',
    	controller: estadisticasCtrl,
    	controllerAs: 'vm'
  	});

  	estadisticasCtrl.$inject = ['ProfesorService', 'UsuarioService', 'MaterialService', 'ElementoService', 'OrientacionService', 'EstablecimientoService', 'EtiquetaService', 'ListarActualizacionesService'];

  	function estadisticasCtrl(ProfesorService, UsuarioService, MaterialService, ElementoService, OrientacionService, EstablecimientoService, EtiquetaService, ListarActualizacionesService) {
      var vm = this;
      
      vm.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
      vm.data = [300, 500, 100];

      vm.usuarios={};

      UsuarioService.query().$promise.then(function (data) {
        vm.usuarios = data;
        console.log(vm.usuarios.length);
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