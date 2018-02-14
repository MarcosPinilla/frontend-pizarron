(function () {
	'use strict';

	angular
  	.module('app')
  	.component('perfil', {
    	templateUrl: 'app/components/perfil/perfil.html',
    	controller: perfilCtrl,
    	controllerAs: 'vm'
  	});

  	perfilCtrl.$inject = ['ProfesorService',  'ObtenerMejoresFavoritos',   '$stateParams', 'PerfilService', 'AmigoService', '$rootScope', '$state'];

  	function perfilCtrl(ProfesorService,  ObtenerMejoresFavoritos, $stateParams, PerfilService, AmigoService ) {
  		var vm = this;
      vm.perfil = {};
      vm.amistad = {};
      vm.mejoresFavoritos = {};
      vm.isUser = false;
      vm.isAmigo = false;



      vm.mejoresFavoritos = ObtenerMejoresFavoritos.get({id: $stateParams.id});

        vm.mejoresFavoritos.$promise.then(function(data){
          console.log(data);
          vm.mejoresFavoritos = data;
          
   
      });

      vm.profesorIdD = $stateParams.id;
      console.log(vm.profesorIdD );
      vm.profesorId = getUrlParameter('id');
      //Si intentamos buscar un perfil
      if(vm.profesorId) {
        ProfesorService.get({id: vm.profesorId}).$promise.then(function (data) {
          //console.log(data);
          if(data.error) {
            vm.perfil.nombres_profesor = data.mensaje;
          }
          else {
            vm.perfil = data;
            vm.isUser = false;
            /*Obtiene la amistad entre ambos usuarios*/
            AmigoService.get({id: vm.profesorId}).$promise.then(function (data) {
              console.log(data);
              if(data.error) {
                vm.amistad = data.mensaje;
                vm.isAmigo = false;
              }else {
                vm.amistad = data;
                if(vm.amistad.id_estado_amistad == 1)
                  vm.isAmigo = true;
              }
            });
          }
        });
      }else { //Si es el perfil del profesor
        console.log("entre aqui");
        PerfilService.get().$promise.then(function (data) {
              console.log(data.profesor);
              vm.perfil = data.profesor;
              vm.isUser = true;
        });
      }

 

      vm.anadiramigo = function(idamigo) {
        var amigo1 = JSON.parse('{"id_amigo": ' + idamigo + '}');
        console.log('{"id_amigo": ' + idamigo + '}');
        AmigoService.save(amigo1).$promise.then(function (data) {
          vm.amistad = data;
          console.log("El amigo se guardo: " + data.id_estado_amistad);
          if(data.id_estado_amistad == 1)
            vm.isAmigo = true;
        });

        /*AmigoService.get({id: vm.profesorId}).$promise.then(function (data) {
          vm.amistad = data;
          console.log("EL ESTADO ES!: " + vm.amistad.id_estado_amistad);
          if(vm.amistad.id_estado_amistad == 1)
            vm.isAmigo = true;
        });*/
      }

      vm.eliminaramistad = function(id) {
        AmigoService.delete({id: id});
        AmigoService.get({id: vm.profesorId}).$promise.then(function (data) {
          vm.amistad = data;
          if(vm.amistad.id_estado_amistad == 1)
            vm.isAmigo = false;
        });
      }

      function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
      };
  	}
})();