(function () {
	'use strict';

	angular
  	.module('app')
  	.component('perfil', {
    	templateUrl: 'app/components/perfil/perfil.html',
    	controller: perfilCtrl,
    	controllerAs: 'vm'
  	});

  	perfilCtrl.$inject = ['PerfilService', '$rootScope', '$state'];

  	function perfilCtrl(PerfilService) {
  		var vm = this;

      vm.perfil = {};
       PerfilService.get().$promise.then(function (data) {
            console.log(data);
            vm.perfil = data;
            console.log(vm.perfil.profesores.url_foto_profesor);
       });



  	}
})();