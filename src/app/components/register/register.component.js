(function () {
  'use strict';

  angular
  .module('app')
  .component('register', {
    templateUrl: 'app/components/register/register.html',
    controller: registerCtrl,
    controllerAs: 'vm'
  });

  registerCtrl.$inject = ['UsuarioService', 'SexoService', 'ComunaService', '$state', '$rootScope', '$mdDialog'];

  function registerCtrl(UsuarioService, SexoService, ComunaService, $state, $rootScope, $mdDialog) {
    var vm = this;

    $rootScope.$emit('isinRegister'); 

    var user = {};
    vm.sexos ={};
    vm.comunas={};

    SexoService.query().$promise.then(function (data) {
      vm.sexos = data;
    });

    ComunaService.query().$promise.then(function (data) {
      vm.comunas = data;
    });    
  }
})();
