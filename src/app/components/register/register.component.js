(function () {
  'use strict';

  angular
  .module('app')
  .component('register', {
    templateUrl: 'app/components/register/register.html',
    controller: registerCtrl,
    controllerAs: 'vm'
  });

  registerCtrl.$inject = ['UsuarioService', 'SexoService', 'ComunaService', 'RegionService', 'RegisterService', '$state', '$rootScope', '$mdDialog', '$stateParams'];

  function registerCtrl(UsuarioService, SexoService, ComunaService, RegionService, RegisterService, $state, $rootScope, $mdDialog, $stateParams) {
    var vm = this;

    $rootScope.$emit('isinLogin'); 

    var user = {};
    vm.sexos ={};
    vm.comunas=[];
    vm.regiones={};
    vm.modelo={
      id_rol : 2,
      id_contrato: 1
    };
    
    vm.regionId = $stateParams.id;

    RegionService.query().$promise.then(function (data) {
      vm.regiones = data;
      console.log(data);
    });

    console.log(vm.regionId);

    vm.cargarComuna = function() {
      console.log(vm.regionId);
      var idRegion = JSON.parse('{"id": ' + vm.regionId + '}');
      ComunaService.query(idRegion).$promise.then(function (data) {
        vm.comunas = data;
      }); 
    }

    SexoService.query().$promise.then(function (data) {
      vm.sexos = data;
    });
    
    vm.register = function(modelo) {
      RegisterService.save(modelo);
      $rootScope.$emit('registerCompletee'); 
      $state.go('login');
    }

  }
})();
