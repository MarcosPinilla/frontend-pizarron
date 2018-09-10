(function () {
  'use strict';

  angular
  .module('app')
  .component('repositorio', {
    templateUrl: 'app/components/repositorio/repositorio.html',
    controller: repositorioCtrl,
    controllerAs: 'vm'
  });

  repositorioCtrl.$inject = ['ElementoService', 'ObtenerElementosService', 'EtiquetaService', '$rootScope', '$state'];

  function repositorioCtrl(ElementoService, ObtenerElementosService, EtiquetaService, $rootScope, $state) {
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

    vm.obtenerElementos = function($id) {
      console.log($id);
      if ($id > 0) {
        ObtenerElementosService.get({ id: $id }).$promise.then(function (data) {
          vm.elementos = data;
          console.log(vm.elementos);
        });
      }else{
        ElementoService.query().$promise.then(function (data) {
          vm.elementos = data;
          console.log(vm.elementos);
        });
      }

    }


  }
})();
