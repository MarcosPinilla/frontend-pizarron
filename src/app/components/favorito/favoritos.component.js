(function () {
  'use strict';

  angular
  .module('app')
  .component('favoritos', {
    templateUrl: 'app/components/favorito/favoritos.html',
    controller: favoritosCtrl,
    controllerAs: 'vm'
  });

  favoritosCtrl.$inject = ['ObtenerFavoritosProfesor', 'AsignaturaService', 'ListarnivelesService', 'ListartipomaterialService'];

  function favoritosCtrl(ObtenerFavoritosProfesor, AsignaturaService, ListarnivelesService, ListartipomaterialService) {
    var vm = this;

    vm.favoritos = {};

    ObtenerFavoritosProfesor.query().$promise.then(function (data) {
      vm.favoritos = data;
      console.log(vm.favoritos);
      vm.imagePath = data.vista_previa;
    });

    AsignaturaService.query().$promise.then(function (data) {
      vm.asignatura = data;
      console.log(vm.asignatura);
    });

    ListarnivelesService.query().$promise.then(function (data) {
      vm.nivel = data;
      console.log(vm.nivel);
    });

    ListartipomaterialService.query().$promise.then(function (data) {
      vm.tipo = data;
      console.log(vm.tipo);
    });
  }
})();