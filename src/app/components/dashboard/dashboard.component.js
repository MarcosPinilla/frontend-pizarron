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

  function dashboardCtrl($mdDialog) {
    var vm = this;

    vm.showPrompt = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.prompt()
        .title('Nombre del nuevo Documento')
        .placeholder('Documento sin titulo')
        .ariaLabel('documento')
        .targetEvent(ev)
        .required(true)
        .ok('Crear')
        .cancel('Cancelar');

      $mdDialog.show(confirm).then(function(result) {
        vm.status = 'Documento:  ' + result + '.';
      }, function() {
        vm.status = 'CANCELADO';
      });
    };
    /**
    $scope.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'dialog1.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    };**/
  }
})();

