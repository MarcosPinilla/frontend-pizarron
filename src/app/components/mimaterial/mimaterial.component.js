(function () {
  'use strict';

  angular
    .module('app')
    .component('mimaterial', {
      templateUrl: 'app/components/mimaterial/mimaterial.html',
      controller: mimaterialCtrl,
      controllerAs: 'vm'
    });

  mimaterialCtrl.$inject = ['$mdDialog', 'ObtenerMiMaterialService', 'MaterialService', 'AmbitoService', 'NucleoService', 'ListarnivelesService', 'ListartipomaterialService', 'ObtenerFavoritosAnalogosService', 'DarFavorito', '$state', 'PerfilService'];

  function mimaterialCtrl($mdDialog, ObtenerMiMaterialService, MaterialService,AmbitoService, NucleoService, ListarnivelesService, ListartipomaterialService, ObtenerFavoritosAnalogosService, DarFavorito, $state, PerfilService) {
    var vm = this;
    vm.materiales = {};
    vm.autoria = [{id: 0, nombre: 'autor'}, {id: 1, nombre: 'colaborador'}];
    console.log(vm.autoria);

    AmbitoService.query().$promise.then(function (data) {
      vm.ambito = data;
      console.log(vm.ambito);
    });

    NucleoService.query().$promise.then(function (data) {
      vm.nucleo = data;
      console.log(vm.nucleo);
    });

    ListarnivelesService.query().$promise.then(function (data) {
      vm.nivel = data;
    });

    ListartipomaterialService.query().$promise.then(function (data) {
      vm.tipo = data;
    });

    vm.eliminarMaterial = function (id) {
      MaterialService.delete({id: id});


          PerfilService.get().$promise.then(function (data) {
      console.log(data);
      vm.perfil = data;

      ObtenerMiMaterialService.query().$promise.then(function (data) {
        vm.materiales = data;

          for (let i = 0; i < vm.materiales.length; i++) {
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

      ObtenerMiMaterialService.query().$promise.then(function (data) {
        vm.materiales = data;

          for (let i = 0; i < vm.materiales.length; i++) {
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
      $state.go('editdocument', { id: material.id });
    };

    vm.darFavorito = function (material) {
      DarFavorito.save({ material_id: material.id }).$promise.then(function (data) {
        material.esFavorito = !material.esFavorito;
      });
    };

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

    };

  }
})();