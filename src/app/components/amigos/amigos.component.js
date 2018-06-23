(function () {
  'use strict';

  angular
    .module('app')
    .component('amigos', {
      templateUrl: 'app/components/amigos/amigos.html',
      controller: amigosCtrl,
      controllerAs: 'vm'
    });

  amigosCtrl.$inject = ['AmigoService', 'PerfilService', 'SolicitudService', 'ListarSolicitudService', '$state' , '$rootScope'];

  function amigosCtrl(AmigoService, PerfilService, SolicitudService, ListarSolicitudService, $state, $rootScope) {
    var vm = this;
    vm.amigos = {};
    vm.perfil = {};
    vm.solicitudes = {};
    vm.actionSolicitud= false;

    $rootScope.$on('ActionSolicitud', function () {
      vm.actionSolicitud = true;
    });

    PerfilService.get().$promise.then(function (data) {
      vm.perfil = data;
    });

    AmigoService.query().$promise.then(function (data) {
      vm.amigos = data;
    });

    ListarSolicitudService.query().$promise.then(function (data) {
      vm.solicitudes = data;
    });

    vm.verPerfil = function(profesorid) {
      $state.go('perfil', {id: profesorid});
    };

    vm.eliminaramistad = function(id) {
      AmigoService.delete({id: id});
      AmigoService.query().$promise.then(function (data) {
        vm.amigos = data;
      });
    };

    vm.confirmarAmistad = function($idamistad) {
      var amistad = JSON.parse('{"id_amistad": ' + $idamistad + ', "opcion": ' + 1 + '}');
      SolicitudService.save(amistad);
    };

    vm.rechazarAmistad = function($idamistad) {
      var amistad = JSON.parse('{"id_amistad": ' + $idamistad + ', "opcion": ' + 2 + '}');
      SolicitudService.save(amistad);
    };
  }
  
})();