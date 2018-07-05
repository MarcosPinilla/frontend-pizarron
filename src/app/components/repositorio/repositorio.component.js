(function () {
  'use strict';

  angular
  .module('app')
  .component('repositorio', {
    templateUrl: 'app/components/repositorio/repositorio.html',
    controller: repositorioCtrl,
    controllerAs: 'vm'
  });

  repositorioCtrl.$inject = ['ElementoService', 'EtiquetaService', '$rootScope', '$state'];

  function repositorioCtrl(ElementoService, EtiquetaService, $rootScope, $state) {
    var vm = this;

    vm.elementos = [];
    vm.etiquetas = [];
    vm.searchText;
    vm.buscarEtiqueta;

    ElementoService.query().$promise.then(function (data) {
      vm.elementos = data;
      console.log(vm.elementos);
    });

    EtiquetaService.query().$promise.then(function(data) {
      vm.etiquetas = data;
      console.log(vm.etiquetas)
    });

    vm.generarImagen = function(ruta) {
      $rootScope.$broadcast('agregarImagenRepositorio', ruta);
    }
  }
})();
