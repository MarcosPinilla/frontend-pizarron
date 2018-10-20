(function () {
	'use strict';

	angular
  	.module('app')
  	.component('verorientacion', {
    	templateUrl: 'app/components/verorientacion/verorientacion.html',
    	controller: verorientacionCtrl,
    	controllerAs: 'vm'
  	});

  	verorientacionCtrl.$inject = ['$mdDialog', 'OrientacionService', '$state', '$stateParams', 'AmigoService', 'CompartirOrientacionService', 'PerfilService'];

  	function verorientacionCtrl($mdDialog, OrientacionService, $state, $stateParams, AmigoService, CompartirOrientacionService, PerfilService) {
		var vm = this;

        vm.orientaciones = {};
        
        vm.orientacion = OrientacionService.get({id: $stateParams.id});

        vm.amigos = {};
        vm.perfil = {};

        AmigoService.query().$promise.then(function (data) {
            vm.amigos = data;
        });

        PerfilService.get().$promise.then(function (data) {
            vm.perfil = data;
        });
	  
		vm.goMaterial = function (material) { 
		    $state.go('vermaterial', {id: material.id});
		};  
	  
		vm.showCloseUp = function (ev, vista_previa) {
		  $mdDialog.show({
		    controller: closeUpController,
		    controllerAs: 'vm',
		    templateUrl: 'app/components/verorientacion/closeUp.dialogo.html',
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
        
        vm.compartirOrientacion = function (ev, orientacion, amigos, perfil) {
            $mdDialog.show({
              controller: compartirOrientacionController,
              controllerAs: 'vm',
              templateUrl: 'app/components/verorientacion/compartir.dialogo.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true,
              fullscreen: vm.customFullscreen,
              locals: {
              orientacion: orientacion,
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
        function compartirOrientacionController($mdDialog, orientacion, amigos, perfil, AmigoService, CompartirOrientacionService) {
            var vm = this;
            vm.orientacion = orientacion;

            vm.perfil = perfil;

            vm.compartir={
                id_orientacion: 0
            };

            vm.compartir.id_orientacion = vm.orientacion.id;

            vm.amigos = amigos;

            vm.compartirOrientacion = function () {
                console.log(vm.compartir);
                CompartirOrientacionService.save(vm.compartir);
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