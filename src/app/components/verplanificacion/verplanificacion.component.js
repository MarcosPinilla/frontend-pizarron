(function () {
	'use strict';

	angular
  	.module('app')
  	.component('verplanificacion', {
    	templateUrl: 'app/components/verplanificacion/verplanificacion.html',
    	controller: verplanificacionCtrl,
    	controllerAs: 'vm'
  	});

  	verplanificacionCtrl.$inject = ['$mdDialog', 'API', 'MaterialService', 'ContenidoPlanificacionService', '$state', '$stateParams', 'AmigoService', 'CompartirPlanificacionService', 'PerfilService'];

  	function verplanificacionCtrl($mdDialog, API, MaterialService, ContenidoPlanificacionService, $state, $stateParams, AmigoService, CompartirPlanificacionService, PerfilService) {
		var vm = this;

        vm.materialesanexos = {};
        
        vm.planificacion = MaterialService.get({id: $stateParams.id});

        vm.contenido_material = ContenidoPlanificacionService.get({id: $stateParams.id});

        vm.amigos = {};
        vm.perfil = {};

        AmigoService.query().$promise.then(function (data) {
            vm.amigos = data;
        });

        PerfilService.get().$promise.then(function (data) {
            vm.perfil = data;
        });

        vm.pdf = function (){
          console.log("ir a pdf");
          window.location.href = API + 'getpdfplanificacion/'+ vm.planificacion.id;
          
        }  

        console.log(vm.planificacion);
	  
        
        vm.compartirPlanificacion = function (ev, planificacion, amigos, perfil) {
            $mdDialog.show({
              controller: compartirPlanificacionController,
              controllerAs: 'vm',
              templateUrl: 'app/components/verplanificacion/compartir.dialogo.html',
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