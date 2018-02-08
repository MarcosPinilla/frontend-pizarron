(function () {
  'use strict';

  angular
  .module('app')
  .component('profesores', {
    templateUrl: 'app/components/profesores/profesores.html',
    controller: profesoresCtrl,
    controllerAs: 'vm'
  });

  profesoresCtrl.$inject = ['$mdDialog','ProfesorService','SexoService', 'ComunaService', 'UsuarioService', '$state']

  function profesoresCtrl($mdDialog, ProfesorService, SexoService, ComunaService, UsuarioService, $state) {
    var vm = this;

    vm.people = {};

    ProfesorService.query().$promise.then(function (data) {
      vm.people = data;
      console.log(vm.people);
    });

    vm.verprofes = function () {
      ProfesorService.query().$promise.then(function (data) {
      vm.people = data;
      console.log(vm.people);
    });
    }


    vm.goToPerson = function(person, event) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/profesor/profesor.dialogo.html',
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

  function dialogoController($mdDialog, person, ProfesorService, $state, SexoService, ComunaService, UsuarioService) {
        var vm = this;
        vm.person = person;
        vm.upperson = {
          id_usuario: 1,
          id_comuna: 1,
          id_sexo: 1
        };
        vm.profesor= {};
        vm.sexos ={};
        vm.comunas={};
        vm.usuarios={};

        UsuarioService.query().$promise.then(function (data) {
          vm.usuarios = data;
        });

        SexoService.query().$promise.then(function (data) {
        vm.sexos = data;
        });

        ComunaService.query().$promise.then(function (data) {
        vm.comunas = data;
        });



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