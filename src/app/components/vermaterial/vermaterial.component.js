(function () {
	'use strict';

	angular
  	.module('app')
  	.component('vermaterial', {
    	templateUrl: 'app/components/vermaterial/vermaterial.html',
    	controller: vermaterialCtrl,
    	controllerAs: 'vm'
  	});

  	vermaterialCtrl.$inject = ['$mdDialog', 'MaterialAnexoService', '$state', '$stateParams', 'AmigoService', 'CompartirMaterialAnexoService', 'PerfilService'];

  	function vermaterialCtrl($mdDialog, MaterialAnexoService, $state, $stateParams, AmigoService, CompartirMaterialAnexoService, PerfilService) {
		var vm = this;

        vm.materialesanexos = {};
        
        vm.materialanexo = MaterialAnexoService.get({id: $stateParams.id});

        vm.amigos = {};
        vm.perfil = {};

        AmigoService.query().$promise.then(function (data) {
            vm.amigos = data;
        });

        PerfilService.get().$promise.then(function (data) {
            vm.perfil = data;
        });
	  
		vm.showCloseUp = function (ev, vista_previa) {
		  $mdDialog.show({
		    controller: closeUpController,
		    controllerAs: 'vm',
		    templateUrl: 'app/components/vermaterial/closeUp.dialogo.html',
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

        vm.goOrientacion = function (orientacion) { 
		    $state.go('verorientacion', {id: orientacion.id});
		}; 
        
        vm.compartirMaterialAnexo = function (ev, materialanexo, amigos, perfil) {
            $mdDialog.show({
              controller: compartirMaterialAnexoController,
              controllerAs: 'vm',
              templateUrl: 'app/components/vermaterial/compartir.dialogo.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true,
              fullscreen: vm.customFullscreen,
              locals: {
              materialanexo: materialanexo,
              amigos: amigos,
              perfil: perfil
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
        function compartirMaterialAnexoController($mdDialog, materialanexo, amigos, perfil, AmigoService, CompartirMaterialAnexoService) {
            var vm = this;
            vm.materialanexo = materialanexo;

            vm.perfil = perfil;

            vm.compartir={
                id_anexo: 0
            };

            vm.compartir.id_anexo = vm.materialanexo.id;

            vm.amigos = amigos;

            vm.compartirMaterialAnexo = function () {
                CompartirMaterialAnexoService.save(vm.compartir);
                vm.hide();
              };
        
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