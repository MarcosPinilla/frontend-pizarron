(function () {
  'use strict';

  angular
  .module('app')
  .component('favoritos', {
    templateUrl: 'app/components/favorito/favoritos.html',
    controller: favoritosCtrl,
    controllerAs: 'vm'
  });

  favoritosCtrl.$inject = ['ObtenerFavoritosProfesor'];

  function favoritosCtrl(ObtenerFavoritosProfesor) {
    var vm = this;

    vm.favoritos = {};

    ObtenerFavoritosProfesor.query().$promise.then(function (data) {
      vm.favoritos = data;
      console.log(vm.favoritos);
      vm.imagePath = data.vista_previa;
    });
  }
})();