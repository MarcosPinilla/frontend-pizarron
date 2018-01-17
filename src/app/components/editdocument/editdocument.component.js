(function () {
  'use strict';

  angular
  .module('app')
  .component('editdocument', {
    templateUrl: 'app/components/editdocument/editdocument.html',
    controller: editdocumentCtrl,
    controllerAs: 'vm'
  }).config(function ($mdIconProvider) {
    $mdIconProvider
      .defaultIconSet('img/icons/sets/core-icons.svg', 24);
  })
  .filter('keyboardShortcut', function ($window) {
    return function (str) {
      if (!str) {
        return;
      }
      var keys = str.split('-');
      var isOSX = /Mac OS X/.test($window.navigator.userAgent);

      var seperator = (!isOSX || keys.length > 2) ? '+' : '';

      var abbreviations = {
        M: isOSX ? '⌘' : 'Ctrl',
        A: isOSX ? 'Option' : 'Alt',
        S: 'Shift'
      };

      return keys.map(function (key, index) {
        var last = index == keys.length - 1;
        return last ? key : abbreviations[key];
      }).join(seperator);
    };
  })
  .controller('DemoBasicCtrl', function DemoCtrl($mdDialog) {
    this.settings = {
      printLayout: true,
      showRuler: true,
      showSpellingSuggestions: true,
      presentationMode: 'edit'
    };

    this.sampleAction = function(name, ev) {
      $mdDialog.show($mdDialog.alert()
        .title(name)
        .textContent('You triggered the "' + name + '" action')
        .ok('Great')
        .targetEvent(ev)
      );
    };
  });

  editdocumentCtrl.$inject = ['$mdDialog'];
  dialogoController.$inject = ['$mdDialog'];

  function editdocumentCtrl($mdDialog) {
    var vm = this;
    vm.customFullscreen = true;

    vm.showAddColaborator = function(ev) {
      $mdDialog.show({
        controller: dialogoController,
        templateUrl: 'app/components/editdocument/agregarcolaborador.dialog.html',
        //  parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
      }).then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
      }, function () {
        vm.status = 'CANCELADO';
      });
    };
  }

  function dialogoController($mdDialog) {
    var vm = this;
    vm.profesores = {};

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
