(function () {
  'use strict';

  angular
  .module('app')
  .component('dashboard', {
    templateUrl: 'app/components/dashboard/dashboard.html',
    controller: dashboardCtrl,
    controllerAs: 'vm'
  });

  dashboardCtrl.$inject = ['$mdDialog'];
  dialogoController.$inject = ['$mdDialog'];

  function dashboardCtrl($mdDialog) {
    var vm = this;

    vm.customFullscreen = true;

    vm.showPrompt = function (ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.prompt()
        .title('Nombre del nuevo Documento')
        .placeholder('Documento sin titulo')
        .ariaLabel('documento')
        .targetEvent(ev)
        .required(true)
        .ok('Crear')
        .cancel('Cancelar');

      $mdDialog.show(confirm).then(function (result) {
        vm.status = 'Documento:  ' + result + '.';
      }, function () {
        vm.status = 'CANCELADO';
      });
    };
    vm.showNewDocument = function (ev) {
      $mdDialog.show({
        controller: dialogoController,
        templateUrl: 'app/components/dashboard/nuevodocumento.dialogo.html',
        //  parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
      }, function () {
        vm.status = 'CANCELADO';
      });
    };
    vm.showCalendar = function (ev) {
      $mdDialog.show({
        controller: dialogoController,
        templateUrl: 'app/components/dashboard/calendario.dialogo.html',
        //  parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function (answer) {
        vm.status = 'Calendario:  ' + answer + '.';
      }, function () {
        vm.status = 'CANCELADO';
      });
    };
  }

  function dialogoController($mdDialog) {
    var vm = this;

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

