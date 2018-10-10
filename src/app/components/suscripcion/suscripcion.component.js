(function () {
    'use strict';
  
    angular
    .module('app')
    .component('suscripcion', {
      templateUrl: 'app/components/suscripcion/suscripcion.html',
      controller: suscripcionCtrl,
      controllerAs: 'vm'
    });
  
     suscripcionCtrl.$inject = ['$mdDialog','SuscripcionService'];
  
    function suscripcionCtrl($mdDialog, SuscripcionService) {
      var vm = this;
      vm.suscripciones = {};
  
      vm.query = {
        order: 'name',
        limit: 5,
        page: 1
      };
  
      SuscripcionService.query().$promise.then(function (data) {
        vm.suscripciones = data;
        console.log(vm.suscripciones);
      });
  
      vm.versuscripciones = function () {
        SuscripcionService.query().$promise.then(function (data) {
        vm.suscripciones = data;
        console.log(vm.suscripciones);
      });
      }
  
      vm.anadirsuscripcion = function (suscripcion, event) {
        $mdDialog.show({
          controller: dialogoController,
          controllerAs: 'vm',
          templateUrl: 'app/components/suscripcion/añadirsuscripcion.dialogo.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose: true,
          fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
          locals: {
            suscripcion : suscripcion
          }
        })
        .then(function (answer) {
          vm.status = 'Documento:  ' + answer + '.';
          SuscripcionService.query().$promise.then(function (data) {
            vm.suscripciones = data;
            console.log(vm.suscripciones);
          });
  
        }, function () {
          vm.status = 'CANCELADO';
        });
      };
  
      vm.eliminarsuscripcion = function (id) {
        SuscripcionService.delete({id: id});
        SuscripcionService.query().$promise.then(function (data) {
          vm.suscripciones = data;
          console.log(vm.suscripciones);
        });
      };
  
      vm.actualizarsuscripcion = function (suscripcion, event) {
        $mdDialog.show({
          controller: dialogoController,
          controllerAs: 'vm',
          templateUrl: 'app/components/suscripcion/actualizarsuscripcion.dialogo.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose: true,
          fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
          locals: {
            suscripcion : suscripcion
          }
        })
        .then(function (answer) {
          vm.status = 'Documento:  ' + answer + '.';
          SuscripcionService.query().$promise.then(function (data) {
            vm.suscripciones = data;
            console.log(vm.suscripciones);
          });
        }, function () {
          vm.status = 'CANCELADO';
        });
      };
  
  
      vm.goTosuscripcion = function(suscripcion, event) {
        $mdDialog.show({
          controller: dialogoController,
          controllerAs: 'vm',
          templateUrl: 'app/components/suscripcion/suscripcion.dialogo.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose: true,
          fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
          locals: {
            suscripcion : suscripcion
          }
        })
        .then(function (answer) {
          vm.status = 'Documento:  ' + answer + '.';
        }, function () {
          vm.status = 'CANCELADO';
        });
      };
    }
    function dialogoController($mdDialog, suscripcion, SuscripcionService, $state) {
          var vm = this;
          vm.suscripcion = suscripcion;
          vm.upsuscripcion = {};
  
          vm.anadirsuscripcion = function (suscripcion) {
            SuscripcionService.save(suscripcion);
            vm.hide();
          };
  
  
          vm.actualizarsuscripcion = function (suscripcion) {
            SuscripcionService.update({id: vm.suscripcion.id}, suscripcion, function () {
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
  