(function () {
	'use strict';

	angular
  	.module('app')
  	.component('perfil', {
    	templateUrl: 'app/components/perfil/perfil.html',
    	controller: perfilCtrl,
    	controllerAs: 'vm'
  	});

  	perfilCtrl.$inject = ['ProfesorService', 'PerfilService', 'AmigoService', '$rootScope', '$state'];

  	function perfilCtrl(ProfesorService, PerfilService, AmigoService) {
  		var vm = this;
      vm.perfil = {};
      vm.isUser = false;
      vm.id = getUrlParameter('id');

      //Si intentamos buscar un perfil
      if(vm.id) {
        ProfesorService.get({id: vm.id}).$promise.then(function (data) {
        //console.log(data);
        if(data.error)
          vm.perfil.nombres_profesor = data.mensaje;
        else
        vm.perfil = data;
        vm.isUser = false;
        });
      }else { //SI es el perfil del profesor
        console.log("entre aqui");
        PerfilService.get().$promise.then(function (data) {
              //console.log(data.profesores);
              vm.perfil = data.profesores;
              vm.isUser = true;
        });
      }

      vm.anadiramigo = function(wea) {
        //console.log(wea);
        /*var text = '{ "id" :' + wea + '}';
        var obj = JSON.parse(text);
        console.log(obj);*/ 
        //console.log(wea)
        AmigoService.save(wea);
      }

      function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
      };
  	}
})();