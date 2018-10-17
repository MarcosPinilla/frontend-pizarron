(function () {
	'use strict';

	angular
  	.module('app')
  	.component('editplanificacion', {
    	templateUrl: 'app/components/editplanificacion/editplanificacion.html',
    	controller: editplanificacionCtrl,
    	controllerAs: 'vm'
  	});

  	editplanificacionCtrl.$inject = ['$mdDialog', 'API', 'MaterialService', '$stateParams', 'ActualizarPlanificacionService', 'ContenidoPlanificacionService', '$state', 'AmigoService', 'CompartirPlanificacionService', 'PerfilService'];

  	function editplanificacionCtrl($mdDialog, API, MaterialService, $stateParams, ActualizarPlanificacionService, ContenidoPlanificacionService, $state, AmigoService, CompartirPlanificacionService, PerfilService) {
		var vm = this;  
		vm.planificacion = MaterialService.get({id: $stateParams.id});
		if(vm.planificacion.id_tipo_material == 2){
			$state.go('editdocument', { id: material.id });
		}
		vm.contenido_material = ContenidoPlanificacionService.get({id: $stateParams.id});
		console.log(vm.planificacion);
		console.log(vm.contenido_material);

		vm.update = {
			contenido_material:{}
		}

		vm.update.contenido_material= vm.contenido_material;

		vm.updatear = function(){
			ActualizarPlanificacionService.update({id: $stateParams.id}, vm.update, function () {
			}, function () {});
    }
    
    vm.pdf = function (){
      console.log("ir a pdf");
      window.location.href = API + 'getpdfplanificacion/'+ vm.planificacion.id;
      
    }  

		vm.amigos = {};
        vm.perfil = {};

        AmigoService.query().$promise.then(function (data) {
            vm.amigos = data;
        });

        PerfilService.get().$promise.then(function (data) {
            vm.perfil = data;
        });

        console.log(vm.planificacion);
	  
        
        vm.compartirPlanificacion = function (ev, planificacion, amigos, perfil) {
            $mdDialog.show({
              controller: compartirPlanificacionController,
              controllerAs: 'vm',
              templateUrl: 'app/components/editplanificacion/compartir.dialogo.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true,
              fullscreen: vm.customFullscreen,
              locals: {
              planificacion: planificacion,
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
	  
        function compartirPlanificacionController($mdDialog, planificacion, amigos, perfil, AmigoService, CompartirPlanificacionService) {
            var vm = this;
            vm.planificacion = planificacion;

            vm.perfil = perfil;

            console.log(vm.planificacion);

            vm.compartir={
                id_planificacion: 0
            };

            vm.compartir.id_planificacion = vm.planificacion.id;

            vm.amigos = amigos;

            console.log(vm.amigos);

            vm.compartirPlanificacion = function () {
                console.log(vm.compartir);
                CompartirPlanificacionService.save(vm.compartir);
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