(function () {
    'use strict';
  
    angular
      .module('app')
      .component('miplanificacion', {
        templateUrl: 'app/components/miplanificacion/miplanificacion.html',
        controller: miplanificacionCtrl,
        controllerAs: 'vm'
      });
  
    miplanificacionCtrl.$inject = ['$mdDialog', 'ObtenerMiPlanificacionService', 'MaterialService', 'ListarambitosService', 'NucleoByAmbitoService', 'NivelByNucleoService', 'ListartipomaterialService', 'ObtenerFavoritosAnalogosService', 'DarFavorito', '$state', 'PerfilService'];
  
    function miplanificacionCtrl($mdDialog, ObtenerMiPlanificacionService, MaterialService,ListarambitosService, NucleoByAmbitoService, NivelByNucleoService, ListartipomaterialService, ObtenerFavoritosAnalogosService, DarFavorito, $state, PerfilService) {
      var vm = this;
      vm.materiales = {};
      vm.autoria = [{id: 0, nombre: 'autor'}, {id: 1, nombre: 'colaborador'}];
      console.log(vm.autoria);
  
      ListarambitosService.query().$promise.then(function (data) {
        vm.ambitos = data;
        console.log(vm.ambitos);
      });
  
      vm.cargarNucleos = function() {
        var idAmbito = JSON.parse('{"id": ' + vm.filter.objetivo_aprendizaje.nivel.nucleo.ambito.id + '}');
        NucleoByAmbitoService.query(idAmbito).$promise.then(function (data) {
          vm.nucleos = data;
        }); 
      }
  
      vm.cargarNiveles = function() {
        var idNucleo = JSON.parse('{"id": ' + vm.filter.objetivo_aprendizaje.nivel.nucleo.id + '}');
        NivelByNucleoService.query(idNucleo).$promise.then(function (data) {
          vm.niveles = data;
        });
      }
  
      ListartipomaterialService.query().$promise.then(function (data) {
        vm.tipo = data;
      });
  
      vm.eliminarMaterial = function (id) {
        MaterialService.delete({id: id});
  
  
            PerfilService.get().$promise.then(function (data) {
        console.log(data);
        vm.perfil = data;
  
        ObtenerMiPlanificacionService.query().$promise.then(function (data) {
          vm.materiales = data;
  
            for (var i = 0; i < vm.materiales.length; i++) {
              if(vm.materiales[i].colaboradores[0].id == vm.perfil.id)
                vm.materiales[i].autor = 'autor';
              else
                vm.materiales[i].autor = 'colaborador';
            }
  
          console.log("NO!");
          console.log(vm.materiales);
  
          ObtenerFavoritosAnalogosService.query().$promise.then(function (data) {
            vm.favoritos = data;
            vm.idfavoritos = vm.favoritos.map(function (i) { return i.id_material; });
  
            for (var x = 0; x < vm.materiales.length; x++) {
              //if(!vm.materiales.hasOwnProperty(x)) continue;
              if (vm.idfavoritos.length > 0) {
                console.log(vm.idfavoritos);
                vm.materiales[x].esFavorito = vm.idfavoritos.indexOf(vm.materiales[x].id) > -1;
                console.log(vm.materiales[x]);
              } else {
                vm.materiales[x].esFavorito = false;
              }
            }
          });
        });
      });
  
      };
  
      PerfilService.get().$promise.then(function (data) {
        console.log(data);
        vm.perfil = data;
  
        ObtenerMiPlanificacionService.query().$promise.then(function (data) {
          vm.materiales = data;
  
            for (var i = 0; i < vm.materiales.length; i++) {
              if(vm.materiales[i].colaboradores[0].id == vm.perfil.id)
                vm.materiales[i].autor = 'autor';
              else
                vm.materiales[i].autor = 'colaborador';
            }
  
          console.log("NO!");
          console.log(vm.materiales);
  
          ObtenerFavoritosAnalogosService.query().$promise.then(function (data) {
            vm.favoritos = data;
            vm.idfavoritos = vm.favoritos.map(function (i) { return i.id_material; });
  
            for (var x = 0; x < vm.materiales.length; x++) {
              //if(!vm.materiales.hasOwnProperty(x)) continue;
              if (vm.idfavoritos.length > 0) {
                console.log(vm.idfavoritos);
                vm.materiales[x].esFavorito = vm.idfavoritos.indexOf(vm.materiales[x].id) > -1;
                console.log(vm.materiales[x]);
              } else {
                vm.materiales[x].esFavorito = false;
              }
            }
          });
        });
      });
  
      vm.goMaterial = function (material) {
        $state.go('editplanificacion', { id: material.id });
      };
  
      vm.darFavorito = function (material) {
        DarFavorito.save({ material_id: material.id }).$promise.then(function (data) {
          material.esFavorito = !material.esFavorito;
        });
      };
      
      /*
      vm.showCloseUp = function (ev, vista_previa) {
        $mdDialog.show({
          controller: closeUpController,
          controllerAs: 'vm',
          templateUrl: 'app/components/materiales/closeUp.dialogo.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: vm.customFullscreen,
          locals: {
            vista_previa: vista_previa,
          },
        })
          .then(function (answer) {
            vm.status = 'Documento:  ' + answer + '.';
          }, function () {
            vm.status = 'CANCELADO';
          });
      };
  
      function closeUpController($mdDialog, vista_previa) {
        var vm = this;
        vm.vista_previa = vista_previa;
  
        vm.hide = function () {
          $mdDialog.hide();
        };
  
        vm.cancel = function () {
          $mdDialog.cancel();
        };
  
        vm.answer = function (answer) {
          $mdDialog.hide(answer);
        };
  
      };*/
  
    }
  })();