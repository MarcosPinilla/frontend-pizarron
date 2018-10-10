(function () {
  'use strict';

  angular
  .module('app')
  .component('profesor', {
    templateUrl: 'app/components/profesor/profesor.html',
    controller: profesorCtrl,
    controllerAs: 'vm'
  });

  profesorCtrl.$inject = ['$mdDialog','ProfesorService','SexoService', 'ComunaService', 'UsuarioService', '$state', 'RolService', 'RegionService', '$stateParams', 'EducadoraService']

  function profesorCtrl($mdDialog, ProfesorService, SexoService, ComunaService, UsuarioService, $state, RolService, RegionService, $stateParams, EducadoraService) {
    var vm = this;

    vm.people = {};


    ProfesorService.query().$promise.then(function (data) {
      vm.people = data;
      console.log(vm.people);
    });

    vm.query = {
      order: 'id',
      limit: 5,
      page: 1
    };

    vm.verprofes = function () {
      ProfesorService.query().$promise.then(function (data) {
      vm.people = data;
      console.log(vm.people);
    });
    }

    vm.anadirprofesor = function (person, event) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/profesor/añadirprofesor.dialogo.html',
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
        ProfesorService.query().$promise.then(function (data) {
          vm.people = data;
          console.log(vm.people);
        });

      }, function () {
        vm.status = 'CANCELADO';
      });
    };

    vm.eliminarprofesor = function (id) {
      ProfesorService.delete({id: id});
      ProfesorService.query().$promise.then(function (data) {
        vm.people = data;
        console.log(vm.people);
      });
    };

    vm.actualizarprofesor = function (person, event) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/profesor/editarprofesor.dialogo.html',
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
        ProfesorService.query().$promise.then(function (data) {
          vm.people = data;
          console.log(vm.people);
        });
      }, function () {
        vm.status = 'CANCELADO';
      });
    };


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
  function dialogoController($mdDialog, person, ProfesorService, $state, SexoService, ComunaService, UsuarioService, RolService, RegionService, $stateParams, SuscripcionService, EducadoraService) {
        var vm = this;
        vm.person = person;
        console.log(person);
        vm.profesor= {};
        vm.sexos ={};
        vm.comunas={};
        vm.usuarios={};
        vm.roles={};
        vm.suscripciones={};

        vm.regiones={};
        vm.modelo={};
        
        vm.regionId = $stateParams.id;

        SuscripcionService.query().$promise.then(function (data) {
          vm.suscripciones = data;
          console.log(data);
        });

        RegionService.query().$promise.then(function (data) {
          vm.regiones = data;
          console.log(data);
        });

        RolService.query().$promise.then(function (data) {
          vm.roles = data;
          console.log(data);
        });

        console.log(vm.regionId);

        vm.cargarComuna = function() {
          console.log(vm.regionId);
          var idRegion = JSON.parse('{"id": ' + vm.regionId + '}');
          ComunaService.query(idRegion).$promise.then(function (data) {
            vm.comunas = data;
          }); 
        }

        SexoService.query().$promise.then(function (data) {
          vm.sexos = data;
        });
        
        vm.register = function(modelo) {
          EducadoraService.save(modelo);
          vm.hide();
        }

        UsuarioService.query().$promise.then(function (data) {
          vm.usuarios = data;
        });

        SexoService.query().$promise.then(function (data) {
        vm.sexos = data;
        });

        ComunaService.query().$promise.then(function (data) {
        vm.comunas = data;
        });

        vm.anadirprofesor = function (profesor) {
          ProfesorService.save(profesor);
          $state.go('profesor');
          vm.hide();
        };


        vm.actualizarprofesor = function (profesor) {
          vm.upperson = {
            id_usuario: vm.person.id_usuario,
            id_comuna: vm.person.id_comuna,
            id_sexo: vm.person.id_sexo
          };
          ProfesorService.update({id: vm.person.id}, profesor, function () {
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
