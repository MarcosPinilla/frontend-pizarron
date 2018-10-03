(function () {
    'use strict';
  
    angular
    .module('app')
    .component('materialanexo', {
      templateUrl: 'app/components/materialanexo/materialanexo.html',
      controller: materialanexoCtrl,
      controllerAs: 'vm'
    });
  
    materialanexoCtrl.$inject = ['MaterialAnexoService', '$state', '$mdDialog', 'OrientacionService'];
  
    function materialanexoCtrl(MaterialAnexoService, $state, $mdDialog, OrientacionService) {
      var vm = this;
  
      vm.materialesanexos = {};
      vm.orientaciones = {};
  
      MaterialAnexoService.query().$promise.then(function (data) {
        vm.materialesanexos = data;
        console.log(vm.materialesanexos);
      });

      OrientacionService.query().$promise.then(function (data) {
        vm.orientaciones = data;
      });
  
      vm.query = {
        order: 'id',
        limit: 5,
        page: 1
      };
    
      vm.anadirmaterialanexo = function (materialanexo,orientaciones, event) {
        $mdDialog.show({
          controller: dialogoController,
          controllerAs: 'vm',
          templateUrl: 'app/components/materialanexo/nuevomaterialanexo.dialogo.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose: true,
          fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
          locals: {
            materialanexo : materialanexo,
            orientaciones : orientaciones
          }
        })
        .then(function (answer) {
          vm.status = 'Documento:  ' + answer + '.';
          MaterialAnexoService.query().$promise.then(function (data) {
            vm.materialesanexos = data;
            console.log(vm.materialesanexos);
          });
  
        }, function () {
          vm.status = 'CANCELADO';
        });
      };

      vm.editarmaterialanexo = function (materialanexo,orientaciones, event) {
        $mdDialog.show({
          controller: dialogoController,
          controllerAs: 'vm',
          templateUrl: 'app/components/materialanexo/editarmaterialanexo.dialogo.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose: true,
          fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
          locals: {
            materialanexo : materialanexo,
            orientaciones : orientaciones
          }
        })
        .then(function (answer) {
          vm.status = 'Documento:  ' + answer + '.';
          MaterialAnexoService.query().$promise.then(function (data) {
            vm.materialesanexos = data;
            console.log(vm.materialesanexos);
          });
        }, function () {
          vm.status = 'CANCELADO';
        });
      };
  
      vm.eliminarmaterialanexo = function (id) {
        MaterialAnexoService.delete({id: id});
        MaterialAnexoService.query().$promise.then(function (data) {
          vm.materialesanexos = data;
          console.log(vm.materialesanexos);
          $state.go('administrator.materialanexo');
        });
      };
      
    }
    function dialogoController($mdDialog, materialanexo, orientaciones, OrientacionService, $state, MaterialAnexoService) {
      var vm = this;
      vm.materialanexo = materialanexo;

      vm.orientaciones = orientaciones;
      
      vm.upmaterialanexo = {};
      vm.materialesanexos = {}; 
  
      vm.newmaterialanexo={};
  
      MaterialAnexoService.query().$promise.then(function (data) {
        vm.materialesanexos = data;
      });
  
      vm.anadirmaterialanexo = function () {
        console.log(vm.newmaterialanexo);
        MaterialAnexoService.save(vm.newmaterialanexo);
        $state.go('administrator.materialanexo');
        vm.hide();
      };

      vm.actualizarmaterialanexo = function (materialanexo) {
        MaterialAnexoService.update({id: vm.materialanexo.id}, materialanexo, function () {
          vm.hide();
        }, function () {});
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