(function () {
	'use strict';

	angular
  	.module('app')
  	.component('editplanificacion', {
    	templateUrl: 'app/components/editplanificacion/editplanificacion.html',
    	controller: editplanificacionCtrl,
    	controllerAs: 'vm'
  	});

  	editplanificacionCtrl.$inject = ['MaterialService', '$stateParams', 'ActualizarPlanificacionService', 'ContenidoPlanificacionService', '$state'];

  	function editplanificacionCtrl(MaterialService, $stateParams, ActualizarPlanificacionService, ContenidoPlanificacionService, $state) {
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
		
  	}
})();