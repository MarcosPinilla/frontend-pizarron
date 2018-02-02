(function () {
  'use strict';
  angular.module('app')
  .controller('MaterialesProfesor.controller', materialesProfesorCtrl);

  materialesProfesorCtrl.$inject = ['obtenerMaterialProfesor', '$log', '$stateParams'];

  function materialesProfesorCtrl(obtenerMaterialProfesor, $log, $stateParams) {
    var vm = this;


    vm.materiales = obtenerMaterialProfesor.get();

    vm.materiales.$promise.then(function(data){
      console.log(data);
      vm.materiales = data;

    });
  }
})();