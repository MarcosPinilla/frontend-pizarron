(function () {
  'use strict';

  angular
    .module('app')
    .component('amigos', {
      templateUrl: 'app/components/amigos/amigos.html',
      controller: amigosCtrl,
      controllerAs: 'vm'
    });

  amigosCtrl.$inject = ['AmigoService', 'PerfilService', 'SolicitudService', 'ListarSolicitudService', '$state'];

  function amigosCtrl(AmigoService, PerfilService, SolicitudService, ListarSolicitudService, $state) {
    var vm = this;
    vm.amigos = {};
    vm.perfil = {};
    vm.solicitudes = {};

    PerfilService.get().$promise.then(function (data) {
      //console.log(data);
      vm.perfil = data;
    });

    AmigoService.query().$promise.then(function (data) {
      vm.amigos = data;
    });

    ListarSolicitudService.query().$promise.then(function (data) {
      vm.solicitudes = data;
      console.log('Solicitudes');
      console.log(vm.solicitudes);
    })

    vm.verPerfil = function(profesorid) {
      console.log('id del profesor: ' + profesorid);
      $state.go('perfil', {id: profesorid});
    }

    vm.eliminaramistad = function(id) {
      AmigoService.delete({id: id});
      AmigoService.query().$promise.then(function (data) {
        vm.amigos = data;
        //console.log(vm.amigos);
      });
    }

    vm.confirmarAmistad = function($idamistad) {
      //console.log('{"id_amistad": ' + $idamistad + ', "opcion": ' + 1 + '}');
      var amistad = JSON.parse('{"id_amistad": ' + $idamistad + ', "opcion": ' + 1 + '}');
      console.log(amistad);
      SolicitudService.save(amistad);
    }

    vm.rechazarAmistad = function($idamistad) {
      var amistad = JSON.parse('{"id_amistad": ' + $idamistad + ', "opcion": ' + 2 + '}');
      console.log(amistad);
      SolicitudService.save(amistad);
    }
  }
  
})();