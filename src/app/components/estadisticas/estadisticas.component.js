(function () {
	'use strict';

	angular
  	.module('app')
  	.component('estadisticas', {
    	templateUrl: 'app/components/estadisticas/estadisticas.html',
    	controller: estadisticasCtrl,
    	controllerAs: 'vm'
  	});

  	estadisticasCtrl.$inject = ['ProfesorService', 'UsuarioService', 'MaterialService', 'ElementoService', 'AsignaturaService', 'EstablecimientoService'];

  	function estadisticasCtrl(ProfesorService, UsuarioService, MaterialService, ElementoService, AsignaturaService, EstablecimientoService) {
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

      ElementoService.query().$promise.then(function (data) {
      vm.elementos = data;
      });

      AsignaturaService.query().$promise.then(function (data) {
      vm.asignaturas = data;
      });

      EstablecimientoService.query().$promise.then(function (data) {
      vm.establecimientos = data;
      });
  	}
})();