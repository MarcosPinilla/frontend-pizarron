(function () {
  'use strict';

  angular
  .module('app')
  .component('objetivomineduc', {
    templateUrl: 'app/components/objetivomineduc/objetivomineduc.html',
    controller: objetivomineducCtrl,
    controllerAs: 'vm'
  });

  objetivomineduc.$inject = ['$mdDialog', 'ObjetivoMineducService'];

  function objetivomineducCtrl($mdDialog, ObjetivoMineducService) {
    var vm = this;
    vm.objetivosMineduc = {};

    ObjetivoMineducService.query().$promise.then(function (data) {
      vm.objetivosMineduc = data;
      console.log(vm.objetivosMineduc);
    });

    vm.goToObjetivo = function(objetivo, event) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/objetivomineduc/objetivomineduc.dialogo.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          objetivomineduc: objetivo
        }
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
      }, function () {
        vm.status = 'CANCELADO';
      });
    };
  }

  function dialogoController($mdDialog, objetivomineduc, ObjetivoMineducService, $state, AsignaturaService) {
    var vm = this;
    vm.objetivosmineducxd = {};
    vm.objetivomineduc = objetivomineduc;
    vm.upestablecimiento = {};
    vm.tipoestablecimientos = {};

    ObjetivoMineducService.query().$promise.then(function (data) {
      vm.objetivosmineducxd = data;
    });

    vm.anadirobjetivomineduc = function (asignatura) {
      //AsignaturaService.save(asignatura);
      vm.hide();
    };

    vm.actualizarasignatura = function (asignatura) {
      /**AsignaturaService.update({id: vm.asignatura.id}, asignatura, function () {
        vm.hide();
      }, function () {});*/
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