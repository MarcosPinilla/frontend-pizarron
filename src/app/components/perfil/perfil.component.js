(function () {
	'use strict';

	angular
  	.module('app')
  	.component('perfil', {
    	templateUrl: 'app/components/perfil/perfil.html',
    	controller: perfilCtrl,
    	controllerAs: 'vm'
  	});

  	perfilCtrl.$inject = ['ProfesorService', '$rootScope', '$state'];

  	function perfilCtrl(ProfesorService) {
  		var vm = this;

      var id = getUrlParameter('id');
      vm.perfil = {};
      
      ProfesorService.get({id: id}).$promise.then(function (data) {
        console.log(data);
        if(data.error)
          vm.perfil.nombres_profesor = data.mensaje;
        else
        vm.perfil = data;
      });

      function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
      };
  	}
})();