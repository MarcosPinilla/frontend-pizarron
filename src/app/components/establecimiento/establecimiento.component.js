(function () {
  'use strict';

  angular
  .module('app')
  .component('establecimiento', {
    templateUrl: 'app/components/establecimiento/establecimiento.html',
    controller: establecimientoCtrl,
    controllerAs: 'vm'
  });

   establecimientoCtrl.$inject = ['$mdDialog','EstablecimientoService','TipoestablecimientoService'];

  function establecimientoCtrl($mdDialog, EstablecimientoService,TipoestablecimientoService) {
    var vm = this;
    vm.establecimientos = {};

    EstablecimientoService.query().$promise.then(function (data) {
      vm.establecimientos = data;
      console.log(vm.establecimientos);
    });

    vm.verestablecimientos = function () {
      EstablecimientoService.query().$promise.then(function (data) {
      vm.establecimientos = data;
      console.log(vm.establecimientos);
    });
    }

    vm.anadirestablecimiento = function (establecimiento, event) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/establecimiento/añadirestablecimiento.dialogo.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          establecimiento : establecimiento
        }
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
        EstablecimientoService.query().$promise.then(function (data) {
          vm.establecimientos = data;
          console.log(vm.establecimientos);
        });

      }, function () {
        vm.status = 'CANCELADO';
      });
    };

    vm.eliminarestablecimiento = function (id) {
      EstablecimientoService.delete({id: id});
      EstablecimientoService.query().$promise.then(function (data) {
        vm.establecimientos = data;
        console.log(vm.establecimientos);
      });
    };

    vm.actualizarestablecimiento = function (establecimiento, event) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/establecimiento/actualizarestablecimiento.dialogo.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          establecimiento : establecimiento
        }
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
        EstablecimientoService.query().$promise.then(function (data) {
          vm.establecimientos = data;
          console.log(vm.establecimientos);
        });
      }, function () {
        vm.status = 'CANCELADO';
      });
    };


    vm.goToEstablecimiento = function(establecimiento, event) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/establecimiento/establecimiento.dialogo.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          establecimiento : establecimiento
        }
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
      }, function () {
        vm.status = 'CANCELADO';
      });
    };
  }
  function dialogoController($mdDialog, establecimiento, EstablecimientoService, $state, TipoestablecimientoService) {
        var vm = this;
        vm.establecimiento = establecimiento;
        vm.upestablecimiento = {};
        vm.tipoestablecimientos={};

        TipoestablecimientoService.query().$promise.then(function (data) {
          vm.tipoestablecimientos = data;
        });

        vm.anadirestablecimiento = function (establecimiento) {
          EstablecimientoService.save(establecimiento);
          vm.hide();
        };


        vm.actualizarestablecimiento = function (establecimiento) {
          EstablecimientoService.update({id: vm.establecimiento.id}, establecimiento, function () {
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
