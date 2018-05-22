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
      vm.imagePath = data.vista_previa;
      for(var x = 0; x < vm.favoritos.length; x++){
        vm.favoritos[x].esFavorito = true;
      }
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
  }
})();