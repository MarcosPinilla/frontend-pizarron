(function () {
    'use strict';
  
    angular
    .module('app')
    .component('orientacion', {
      templateUrl: 'app/components/orientacion/orientacion.html',
      controller: orientacionCtrl,
      controllerAs: 'vm'
    });
  
    orientacionCtrl.$inject = ['OrientacionService', '$state', '$mdDialog', 'ListarambitosService'];
  
    function orientacionCtrl(OrientacionService, $state, $mdDialog, ListarambitosService) {
      var vm = this;
  
      vm.orientaciones = {};
  
      OrientacionService.query().$promise.then(function (data) {
        vm.orientaciones = data;
        console.log(vm.orientaciones);
      });

      ListarambitosService.query().$promise.then(function (data) {
        vm.ambitos = data;
        console.log(vm.ambitos);
      });
  
      vm.query = {
        order: 'id',
        limit: 5,
        page: 1
      };
      
      /*
      vm.irMaterial = function (id){
        $state.go("editdocument/" + id);
      }*/
  
      vm.anadirorientacion = function (orientacion,ambitos, event) {
        $mdDialog.show({
          controller: dialogoController,
          controllerAs: 'vm',
          templateUrl: 'app/components/orientacion/nuevaorientacion.dialogo.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose: true,
          fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
          locals: {
            orientacion : orientacion,
            ambitos: ambitos
          }
        })
        .then(function (answer) {
          vm.status = 'Documento:  ' + answer + '.';
          OrientacionService.query().$promise.then(function (data) {
            vm.orientaciones = data;
            console.log(vm.orientaciones);
          });
  
        }, function () {
          vm.status = 'CANCELADO';
        });
      };
  
      vm.eliminarOrientacion = function (id) {
        OrientacionService.delete({id: id});
        OrientacionService.query().$promise.then(function (data) {
          vm.orientaciones = data;
          console.log(vm.orientaciones);
          $state.go('administrator.orientacion');
        });
      };
      
    }
    function dialogoController($mdDialog, orientacion, ambitos, OrientacionService, $state, NucleoByAmbitoService, NivelByNucleoService) {
      var vm = this;
      vm.orientacion = orientacion;

      vm.ambitos = ambitos;
      
      vm.uporientacion = {};
      vm.orientaciones = {}; 
  
      vm.neworientacion={};
  
      OrientacionService.query().$promise.then(function (data) {
        vm.orientaciones = data;
      });

      vm.cargarNucleos = function() {
        var idAmbito = JSON.parse('{"id": ' + vm.neworientacion.id_ambito + '}');
        NucleoByAmbitoService.query(idAmbito).$promise.then(function (data) {
          vm.nucleos = data;
        }); 
      }
  
      vm.cargarNiveles = function() {
        var idNucleo = JSON.parse('{"id": ' + vm.neworientacion.id_nucleo + '}');
        NivelByNucleoService.query(idNucleo).$promise.then(function (data) {
          vm.niveles = data;
        });
      }
  
      vm.anadirorientacion = function () {
        vm.neworientacion.id_objetivo = vm.neworientacion.id_nivel;
        console.log(vm.neworientacion);
        OrientacionService.save(vm.neworientacion);
        $state.go('administrator.orientacion');
        vm.hide();
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