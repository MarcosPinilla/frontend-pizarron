(function () {
  'use strict';

  angular
    .module('app')
    .component('favoritos', {
      templateUrl: 'app/components/favorito/favoritos.html',
      controller: favoritosCtrl,
      controllerAs: 'vm'
    });

  favoritosCtrl.$inject = ['$mdDialog', 'ObtenerFavoritosProfesor', 'AsignaturaService', 'ListarnivelesService', 'ListartipomaterialService', '$state'];

  function favoritosCtrl($mdDialog, ObtenerFavoritosProfesor, AsignaturaService, ListarnivelesService, ListartipomaterialService, $state) {
    var vm = this;

    vm.favoritos = {};

    ObtenerFavoritosProfesor.query().$promise.then(function (data) {
      vm.favoritos = data;
      vm.imagePath = data.vista_previa;
      for (var x = 0; x < vm.favoritos.length; x++) {
        vm.favoritos[x].esFavorito = true;
      }
      console.log(vm.favoritos);
      setTimeout(function () {
        for (let i = 0; i < vm.favoritos.length; i++) {
          document.getElementById(vm.favoritos[i].id).innerHTML = vm.favoritos[i].vista_previa;
        }
      }, 300);
    });

    AsignaturaService.query().$promise.then(function (data) {
      vm.asignatura = data;
    });

    ListarnivelesService.query().$promise.then(function (data) {
      vm.nivel = data;
    });

    ListartipomaterialService.query().$promise.then(function (data) {
      vm.tipo = data;
    });

    vm.goMaterial = function (id_material) {
      $state.go('editdocument', { id: id_material });
    }

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