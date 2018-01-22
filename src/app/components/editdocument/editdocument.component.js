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

  editdocumentCtrl.$inject = ['$mdDialog', 'ProfesorService', 'ListarusuariosService'];

  function editdocumentCtrl($mdDialog, ProfesorService, ListarusuariosService) {
    var vm = this;

    vm.profesores = {};
    vm.usuarios = {};
    vm.customFullscreen = true;
    
    ListarusuariosService.query().$promise.then(function (data) {
      vm.usuarios = data;
    });

    vm.mostrarColaborador = function(ev, usuarios) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/editdocument/agregarcolaborador.dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          usuarios: usuarios
        },
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
      }, function () {
        vm.status = 'CANCELADO';
      });
    };
  }

  function dialogoController($timeout, $q, $mdDialog, usuarios, ListarusuariosService, $state) {
    var vm = this;

    vm.usuarios = usuarios;
    vm.querySearch   = querySearch;

    function querySearch (query) {
      //console.log(vm.usuarios);
      //console.log(query ? vm.usuarios.filter( createFilterFor(query) ) : vm.usuarios);
      //console.log(query ? vm.usuarios.filter( createFilterFor(query) ) : vm.usuarios);
      return query ? vm.usuarios.filter( createFilterFor(query) ) : vm.usuarios;
    }
    
    function createFilterFor(query) {

      var lowercaseQuery = query;
      console.log(lowercaseQuery);

      return function filterFn(usuario) {
        console.log(usuario.email);
        return (usuario.email.indexOf(lowercaseQuery) === 0);
      };
    }

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
