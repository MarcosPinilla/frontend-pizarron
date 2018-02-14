(function () {
  'use strict';

  angular
    .module('app')
    .component('amigos', {
      templateUrl: 'app/components/amigos/amigos.html',
      controller: amigosCtrl,
      controllerAs: 'vm'
    });

  amigosCtrl.$inject = ['AmigoService', 'PerfilService'];

  function amigosCtrl(AmigoService, PerfilService) {
    var vm = this;
    vm.amigos = {};
    vm.perfil = {};

    PerfilService.get().$promise.then(function (data) {
      console.log(data);
      vm.perfil = data;
    });

    AmigoService.query().$promise.then(function (data) {
      vm.amigos = data;
      console.log(vm.amigos);
    });

    vm.eliminaramistad = function(id) {
      AmigoService.delete({id: id});
      AmigoService.query().$promise.then(function (data) {
        vm.amigos = data;
        console.log(vm.amigos);
      });
    }
  }
  
})();