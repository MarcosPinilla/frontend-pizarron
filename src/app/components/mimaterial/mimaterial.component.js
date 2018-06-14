(function () {
  'use strict';

  angular
    .module('app')
    .component('mimaterial', {
      templateUrl: 'app/components/mimaterial/mimaterial.html',
      controller: mimaterialCtrl,
      controllerAs: 'vm'
    });

  mimaterialCtrl.$inject = ['$mdDialog', 'ObtenerMiMaterialService', 'AsignaturaService', 'ListarnivelesService', 'ListartipomaterialService', 'ObtenerFavoritosAnalogosService', 'DarFavorito', '$state'];

  function mimaterialCtrl($mdDialog, ObtenerMiMaterialService, AsignaturaService, ListarnivelesService, ListartipomaterialService, ObtenerFavoritosAnalogosService, DarFavorito, $state) {
    var vm = this;
    vm.materiales = {};

    AsignaturaService.query().$promise.then(function (data) {
      vm.asignatura = data;
    });

    ListarnivelesService.query().$promise.then(function (data) {
      vm.nivel = data;
    });

    ListartipomaterialService.query().$promise.then(function (data) {
      vm.tipo = data;
    });

    ObtenerMiMaterialService.query().$promise.then(function (data) {
      vm.materiales = data;
      setTimeout(function () {
        for (let i = 0; i < vm.materiales.length; i++) {
          document.getElementById(vm.materiales[i].id).innerHTML = vm.materiales[i].vista_previa;
        }
      }, 300);

      ObtenerFavoritosAnalogosService.query().$promise.then(function (data) {
        vm.favoritos = data;
        console.log("ESTOS SON LOS FAVORITOS!!!")
        console.log(vm.favoritos);

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