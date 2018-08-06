(function () {
	'use strict';

	angular
  	.module('app')
  	.component('editplanificacion', {
    	templateUrl: 'app/components/editplanificacion/editplanificacion.html',
    	controller: editplanificacionCtrl,
    	controllerAs: 'vm'
  	});

  	editplanificacionCtrl.$inject = ['MaterialService', '$stateParams'];

  	function editplanificacionCtrl(MaterialService, $stateParams) {
		var vm = this;  
		vm.documento = MaterialService.get({id: $stateParams.id});
  	}
})();