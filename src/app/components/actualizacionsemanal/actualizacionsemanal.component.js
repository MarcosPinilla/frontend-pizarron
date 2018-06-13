(function () {
  'use strict';

  angular
  .module('app')
  .component('actualizacionsemanal', {
    templateUrl: 'app/components/actualizacionsemanal/actualizacionsemanal.html',
    controller: actualizacionsemanalCtrl,
    controllerAs: 'vm'
  });

 actualizacionsemanalCtrl.$inject = ['$mdDialog','ListarActualizacionesService','NoticiaService', '$state'];

  function actualizacionsemanalCtrl($mdDialog, ListarActualizacionesService, NoticiaService, $state) {
    var vm = this;

    vm.actualizaciones = {};

    vm.query = {
      order: '-fecha',
      limit: 5,
      page: 1
    };


    ListarActualizacionesService.query().$promise.then(function (data) {
      vm.actualizaciones = data;
    });


    vm.nuevaActualizacion = function(ev) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/actualizacionsemanal/nuevaActualizacion.dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          actualizacion:null
        },
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
         ListarActualizacionesService.query().$promise.then(function (data) {
          vm.actualizaciones = data;
        });
      }, function () {
        vm.status = 'CANCELADO';
      });
    };

    vm.eliminarActualizacion = function (id) {
      NoticiaService.delete({id: id});
      ListarActualizacionesService.query().$promise.then(function (data) {
        vm.actualizaciones = data;
      });
    };

    vm.editarActualizacion = function (actualizacion, event) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/actualizacionsemanal/editarActualizacion.dialog.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          actualizacion : actualizacion
        }
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
        ListarActualizacionesService.query().$promise.then(function (data) {
          vm.actualizaciones = data;
        });
      }).finally(function () {
         ListarActualizacionesService.query().$promise.then(function (data) {
          vm.actualizaciones = data;
        });
      });
    };

  }

	function dialogoController($mdDialog, NoticiaService, actualizacion) {
        var vm = this;
      
        vm.actualizacion = {};

        vm.upactualizacion = actualizacion;

        vm.crearActualizacion = function () {

          vm.actualizacion.noticia_sistema = 1;
          console.log(vm.actualizacion);
          if(vm.actualizacion.titulo != null && vm.actualizacion.contenido != null) {
            NoticiaService.save(vm.actualizacion);
            vm.hide();
          }
        };

        
        vm.editarActualizacion = function () {
          NoticiaService.update({id: vm.upactualizacion.id}, vm.upactualizacion, function () {
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