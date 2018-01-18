(function () {
  'use strict';

  angular
  .module('app')
  .component('usuario', {
    templateUrl: 'app/components/usuario/usuario.html',
    controller: usuarioCtrl,
    controllerAs: 'vm'
  });

  usuarioCtrl.$inject = ['$mdDialog','UsuarioService','RolService', 'ContratoService'];

  function usuarioCtrl($mdDialog, UsuarioService, RolService, ContratoService) {
    var vm = this;

    vm.usuarios = {};

    UsuarioService.query().$promise.then(function (data) {
      vm.usuarios = data;
      console.log(vm.usuarios);
    });

    vm.goToPerson = function(person, event) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/usuario/usuario.dialogo.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          person : person
        }
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
      }, function () {
        vm.status = 'CANCELADO';
      });
    };

    vm.anadirusuario = function (person, event) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/usuario/añadirusuario.dialogo.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          person : person
        }
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
      }, function () {
        vm.status = 'CANCELADO';
      });
    };
  }

  function dialogoController($mdDialog, person, UsuarioService, $state, RolService, ContratoService) {
        var vm = this;
        vm.person = person;
        vm.upperson = {
          id_usuario: 1,
          id_comuna: 1,
          id_sexo: 1
        };
        vm.profesor= {
          id_usuario: 1
        };
        vm.roles ={};
        vm.contratos={};

        vm.usuario={};

        RolService.query().$promise.then(function (data) {
        vm.roles = data;
        });

        ContratoService.query().$promise.then(function (data) {
        vm.contratos = data;
        });


        vm.anadirusuario = function (usuario) {
          UsuarioService.save(usuario);
          $state.go('usuario');
        };


        vm.actualizarprofesor = function (profesor) {
          ProfesorService.update({id: vm.person.id}, profesor, function () {
            $state.go('profesor');
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