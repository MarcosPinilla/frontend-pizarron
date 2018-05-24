(function () {
  'use strict';

  angular
  .module('app')
  .component('material', {
    templateUrl: 'app/components/material/material.html',
    controller: materialCtrl,
    controllerAs: 'vm'
  });

  materialCtrl.$inject = ['MaterialService', '$state'];

  function materialCtrl(MaterialService, $state) {
    var vm = this;

    vm.materiales = {};

    MaterialService.query().$promise.then(function (data) {
      vm.materiales = data;
      console.log(vm.materiales);
    });

    vm.query = {
      order: 'id',
      limit: 5,
      page: 1
    };

    vm.anadirMaterial = function (material, event) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/material/nuevomaterial.dialogo.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          material : material
        }
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
        MaterialService.query().$promise.then(function (data) {
          vm.materiales = data;
        });
      }, function () {
        vm.status = 'CANCELADO';
      });
    };

    vm.eliminarMaterial = function (id) {
      MaterialService.delete({id: id});
      MaterialService.query().$promise.then(function (data) {
        vm.materiales = data;
        console.log(vm.materiales);
        $state.go('administrator.material');
      });
    };
    
  }
  function dialogoController($mdDialog, material, MaterialService, $state) {
    var vm = this;
    vm.material = material;
    
    vm.upmaterial = {};
    vm.materiales = {}; 

    vm.newmaterial={};

    MaterialService.query().$promise.then(function (data) {
      vm.materiales = data;
    });

    vm.anadirmaterial = function () {
      MaterialService.save(vm.newmaterial);
      $state.go('administrator.material');
      vm.hide();
    };

    vm.hide = function () {
      $mdDialog.hide();
    };

    vm.cancel = function () {
      $mdDialog.cancel();
    };

    vm.answer = function (answer) {
      $mdDialog.hide(answer);
    };
  }
})();