(function () {
	'use strict';

	angular
  	.module('app')
  	.component('myPanel', {
    	templateUrl: 'app/components/panel/panel.html',
    	controller: panelCtrl,
    	controllerAs: 'vm'
  	});

  	panelCtrl.$inject = ['$mdDialog', 'PerfilService'];

  	function panelCtrl($mdDialog, PerfilService) {
  		var vm = this;

      vm.usuario = localStorage.getItem("user");
      vm.perfil = {};

      vm.customFullscreen = true;
      
       PerfilService.get().$promise.then(function (data) {
            console.log(data);
            vm.perfil = data;
            //console.log(vm.perfil.profesores.url_foto_profesor);
       });
  	}
})();