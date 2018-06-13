(function () {
  'use strict';

  angular
  .module('app')
  .component('historialavisos', {
    templateUrl: 'app/components/historialavisos/historialavisos.html',
    controller: historialavisosCtrl,
    controllerAs: 'vm'
  });

 historialavisosCtrl.$inject = ['$mdDialog','ListarAvisosService','$state'];

  function historialavisosCtrl($mdDialog, ListarAvisosService, $state) {
    var vm = this;

    vm.avisos = {};

    vm.query = {
      order: '-fecha',
      limit: 5,
      page: 1
    };


    ListarAvisosService.query().$promise.then(function (data) {
      vm.avisos = data;
      console.log(vm.avisos);
    });


  }

})();