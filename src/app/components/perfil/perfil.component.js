(function () {
	'use strict';

	angular
  	.module('app')
  	.component('perfil', {
    	templateUrl: 'app/components/perfil/perfil.html',
    	controller: perfilCtrl,
    	controllerAs: 'vm'
  	});

  	perfilCtrl.$inject = ['$mdDialog', 'ProfesorService', 'ObtenerMejoresFavoritos', 'FollowService', '$stateParams', 'PerfilService', 'AmigoService', 'SolicitudService', 'MaterialRecientelService','$rootScope', '$state'];

  	function perfilCtrl($mdDialog, ProfesorService,  ObtenerMejoresFavoritos, FollowService, $stateParams, PerfilService, AmigoService, SolicitudService, MaterialRecientelService) {
  		var vm = this;
      vm.perfil = {};
      vm.amistad = {};
      vm.mejoresFavoritos = {};
      vm.materialreciente = {};
      vm.isUser = false;
      vm.isSolicitado = false;
      /*
        0 = No amigo
        1 = Amigo
        2 = Amistad pendiente
      */
      vm.estadoAmistad = 0;
      vm.isSeguido = false;

      vm.profesorId = $stateParams.id;

      vm.mejoresFavoritos = ObtenerMejoresFavoritos.get({id: $stateParams.id});
        vm.mejoresFavoritos.$promise.then(function(data){
          console.log(data);
          vm.mejoresFavoritos = data;
      });

      console.log(vm.profesorId);
      //Si intentamos buscar un perfil
      if(vm.profesorId) {
        ProfesorService.get({id: vm.profesorId}).$promise.then(function (data) {
          console.log(data);
          if(data.error) {
            vm.perfil.nombres_profesor = data.mensaje;
          }
          else {
            vm.perfil = data;
            /*Si el usuario buscado, es el mismo que el usuario logeado*/
            if(vm.perfil.usuario.email == localStorage.getItem('user'))
              vm.isUser = true;
            else
              vm.isUser = false;
            /*Obtiene la amistad entre ambos usuarios*/
            AmigoService.get({id: vm.profesorId}).$promise.then(function (data) {
              console.log(data);
              if(data.error) {
                vm.amistad = data.mensaje;
                vm.estadoAmistad = 0;
              }else {
                vm.amistad = data;
                vm.estadoAmistad = vm.amistad.id_estado_amistad;
                if(vm.estadoAmistad == 2 && vm.amistad.amigo_2 != vm.perfil.id){
                  vm.isSolicitado = true;
                }
              }
            });
          }
        });
      }else{ //Si la ruta no trae id, entonces es nuestro perfil
        PerfilService.get().$promise.then(function (data) {
              console.log(data);
              vm.perfil = data;
              vm.isUser = true;
        });
      }

      MaterialRecientelService.get({id: vm.profesorId}).$promise.then(function (data) {
        console.log(vm.profesorId);
        console.log("WWEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
        console.log(data);
        vm.materialreciente = data;
      });

      vm.showEditarPerfil = function(ev, perfil) {
        $mdDialog.show({
          controller: dialogoController,
          controllerAs: 'vm',
          templateUrl: 'app/components/perfil/editarperfil.dialogo.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: vm.customFullscreen,
          locals: {
            perfil: perfil,
          },
        })
        .then(function(answer) {
          vm.status = 'Perfil: ' + answer + '.';
        }, function () {
          vm.status = 'CANCELADO';
        });
      };

      vm.anadiramigo = function(idamigo) {
        var amigo1 = JSON.parse('{"id_amigo": ' + idamigo + '}');
        console.log('{"id_amigo": ' + idamigo + '}');
        AmigoService.save(amigo1).$promise.then(function (data) {
          vm.amistad = data;
          console.log("El amigo se guardo: " + data.id_estado_amistad);
          if(data.id_estado_amistad == 1)
            vm.estadoAmistad = 1;
        });
      };  

      vm.seguirxd = function(idseguido) {
        console.log("siguiendo");
        var seguido1 = JSON.parse('{"id_seguido": ' + idseguido + '}');
        console.log('{"id_seguido": ' + idseguido + '}');
        FollowService.save(seguido1);
        vm.isSeguido=true;
      };

      vm.aceptarSolicitud = function($idamistad) {
        //console.log('{"id_amistad": ' + $idamistad + ', "opcion": ' + 1 + '}');
        var amistad = JSON.parse('{"id_amistad": ' + $idamistad + ', "opcion": ' + 1 + '}');
        console.log(amistad);
        SolicitudService.save(amistad);
        vm.isSolicitado = false;
      }

        /*AmigoService.get({id: vm.profesorId}).$promise.then(function (data) {
          vm.amistad = data;
          console.log("EL ESTADO ES!: " + vm.amistad.id_estado_amistad);
          if(vm.amistad.id_estado_amistad == 1)
            vm.estadoAmistad = 1;
        });*/
      

      vm.eliminaramistad = function(id) {
        AmigoService.delete({id: id});
        AmigoService.get({id: vm.profesorId}).$promise.then(function (data) {
          vm.amistad = data;
          if(vm.amistad.id_estado_amistad == 1)
            vm.estadoAmistad = 0;
        });
      }

      vm.cancelarSolicitud = function(id) {
        AmigoService.delete({id: id});
        AmigoService.get({id: vm.profesorId}).$promise.then(function (data) {
          vm.amistad = data;
          if(vm.amistad.id_estado_amistad == 1)
            vm.estadoAmistad = 0;
        });
      }

      /*function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
      };*/
  	}

    function dialogoController($scope, $mdDialog, $state, perfil, ProfesorService) {
      var vm = this;

      vm.perfil = perfil;
      console.log(vm.perfil);

      vm.actualizarprofesor = function (profesor) {
        vm.profesor = profesor;
        ProfesorService.update({id: vm.profesor.id}, profesor, function () {
          vm.hide();
        }, function () {});
      };
 
      vm.hide = function() {
      $mdDialog.hide();
      };

      vm.cancel = function() {
      $mdDialog.cancel();
      };

      vm.answer = function(answer) {
      $mdDialog.hide(answer);
      };
    }


})();