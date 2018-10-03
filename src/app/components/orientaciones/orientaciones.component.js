(function () {
	'use strict';

	angular
  	.module('app')
  	.component('orientaciones', {
    	templateUrl: 'app/components/orientaciones/orientaciones.html',
    	controller: orientacionesCtrl,
    	controllerAs: 'vm'
  	});

  	orientacionesCtrl.$inject = ['$mdDialog', 'PublicMaterialService','ListarambitosService', 'NucleoByAmbitoService', 'NivelByNucleoService', 'OrientacionService', '$state'];

  	function orientacionesCtrl($mdDialog, PublicMaterialService, ListarambitosService, NucleoByAmbitoService, NivelByNucleoService, OrientacionService, $state) {
		var vm = this;

		vm.orientaciones = {};
	  
		vm.ambito = {};
	  
		vm.nucleo = {};
	  
		vm.nivel = {};

		OrientacionService.query().$promise.then(function (data) {
			vm.orientaciones = data;
			console.log(vm.orientaciones);
		});
	  
		ListarambitosService.query().$promise.then(function (data) {
		  vm.ambitos = data;
		  console.log(vm.ambitos);
		});
	  
		vm.cargarNucleos = function() {
		  var idAmbito = JSON.parse('{"id": ' + vm.filter.objetivo_aprendizaje.nivel.nucleo.ambito.id + '}');
		  NucleoByAmbitoService.query(idAmbito).$promise.then(function (data) {
		    vm.nucleos = data;
		  }); 
		}
	  
		vm.cargarNiveles = function() {
		  var idNucleo = JSON.parse('{"id": ' + vm.filter.objetivo_aprendizaje.nivel.nucleo.id + '}');
		  NivelByNucleoService.query(idNucleo).$promise.then(function (data) {
		    vm.niveles = data;
		  });
		}
	  
		vm.goMaterial = function (material) { 
		    $state.go('editdocument', {id: material.id});
		};  
	  
		vm.showCloseUp = function (ev, vista_previa) {
		  $mdDialog.show({
		    controller: closeUpController,
		    controllerAs: 'vm',
		    templateUrl: 'app/components/orientaciones/closeUp.dialogo.html',
		    parent: angular.element(document.body),
		    targetEvent: ev,
		    clickOutsideToClose: true,
		    fullscreen: vm.customFullscreen,
		    locals: {
			vista_previa: vista_previa,
		    },
		  })
		    .then(function (answer) {
			vm.status = 'Documento:  ' + answer + '.';
		    }, function () {
			vm.status = 'CANCELADO';
		    });
		};
	  
		function closeUpController($mdDialog, vista_previa) {
		  var vm = this;
		  vm.vista_previa = vista_previa;
	  
		  vm.hide = function () {
		    $mdDialog.hide();
		  };
	  
		  vm.cancel = function () {
		    $mdDialog.cancel();
		  };
	  
		  vm.answer = function (answer) {
		    $mdDialog.hide(answer);
		  };
	  
		};
	}
})();