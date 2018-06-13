(function () {
  'use strict';

  angular
  .module('app')
  .component('vistaactualizacion', {
    templateUrl: 'app/components/actualizacionsemanal/vistaActualizacion.html',
    controller: vistaactualizacionCtrl,
    controllerAs: 'vm'
  });

 vistaactualizacionCtrl.$inject = ['$mdDialog','ListarActualizacionesService', '$state'];

  function vistaactualizacionCtrl($mdDialog, ListarActualizacionesService, $state) {
    var vm = this;

    vm.actualizaciones = {};

    vm.query = {
      order: '-fecha',
      limit: 5,
      page: 1
    };

    ListarActualizacionesService.query().$promise.then(function (data) {
      vm.actualizaciones = data;
    });
  }

})();