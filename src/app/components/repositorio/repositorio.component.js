(function () {
  'use strict';

  angular
  .module('app')
  .component('repositorio', {
    templateUrl: 'app/components/repositorio/repositorio.html',
    controller: repositorioCtrl,
    controllerAs: 'vm'
  });

  repositorioCtrl.$inject = ['ElementoService', '$rootScope', '$state'];

  function repositorioCtrl(ElementoService, $rootScope, $state) {
    var vm = this;

    vm.elementos=[];

    ElementoService.query().$promise.then(function (data) {
      vm.elementos = data;
      console.log(vm.elementos);
    });

    vm.generarImagen=function(ruta) {
      $rootScope.$broadcast('someEvent', ruta);
    }
  }
})();
