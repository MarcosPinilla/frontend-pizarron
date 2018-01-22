(function () {
  'use strict';

  angular
  .module('app')
  .component('asignatura', {
    templateUrl: 'app/components/asignatura/asignatura.html',
    controller: asignaturaCtrl,
    controllerAs: 'vm'
  });

  asignaturaCtrl.$inject = ['$mdDialog', 'AsignaturaService'];

  function asignaturaCtrl($mdDialog, AsignaturaService) {
    var vm = this;
    vm.asignaturas = {};

    AsignaturaService.query().$promise.then(function (data) {
      vm.asignaturas = data;
      console.log(vm.asignaturas);
    });

    vm.verasignaturas = function () {
      AsignaturaService.query().$promise.then(function (data) {
      vm.asignaturas = data;
      console.log(vm.asignaturas);
    });
    }

    vm.anadirasignatura = function (asignatura, event) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/asignatura/añadirasignatura.dialogo.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          asignatura : asignatura
        }
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
        AsignaturaService.query().$promise.then(function (data) {
          vm.asignaturas = data;
          console.log(vm.asignaturas);
        });

      }, function () {
        vm.status = 'CANCELADO';
      });
    };

    vm.eliminarasignatura = function (id) {
      AsignaturaService.delete({id: id});
      AsignaturaService.query().$promise.then(function (data) {
        vm.asignaturas = data;
        console.log(vm.asignaturas);
      });
    };

    vm.actualizarasignatura = function (asignatura, event) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/asignatura/actualizarasignatura.dialogo.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          asignatura : asignatura
        }
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
        AsignaturaService.query().$promise.then(function (data) {
          vm.asignaturas = data;
          console.log(vm.asignaturas);
        });
      }, function () {
        vm.status = 'CANCELADO';
      });
    };


    vm.goToAsignatura = function(asignatura, event) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/asignatura/asignatura.dialogo.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          asignatura : asignatura
        }
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
      }, function () {
        vm.status = 'CANCELADO';
      });
    };
  }

  function dialogoController($mdDialog, asignatura, AsignaturaService, $state, TipoestablecimientoService) {
    var vm = this;
    vm.asignaturasxd={};
    vm.asignatura = asignatura;
    vm.upestablecimiento = {};
    vm.tipoestablecimientos={};

    AsignaturaService.query().$promise.then(function (data) {
      vm.asignaturasxd = data;
    });

    TipoestablecimientoService.query().$promise.then(function (data) {
      vm.tipoestablecimientos = data;
    });

    vm.anadirasignatura = function (asignatura) {
      AsignaturaService.save(asignatura);
      vm.hide();
    };


    vm.actualizarasignatura = function (asignatura) {
      AsignaturaService.update({id: vm.asignatura.id}, asignatura, function () {
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
