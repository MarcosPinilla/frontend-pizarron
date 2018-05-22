(function () {
  'use strict';

  angular
  .module('app')
  .component('mimaterial', {
    templateUrl: 'app/components/mimaterial/mimaterial.html',
    controller: mimaterialCtrl,
    controllerAs: 'vm'
  });

  mimaterialCtrl.$inject = ['ObtenerMiMaterialService', 'AsignaturaService', 'ListarnivelesService', 'ListartipomaterialService'];

  function mimaterialCtrl(ObtenerMiMaterialService, AsignaturaService, ListarnivelesService, ListartipomaterialService, $state) {
    var vm = this;
    vm.materiales = {};

    AsignaturaService.query().$promise.then(function (data) {
      vm.asignatura = data;
    });

    ListarnivelesService.query().$promise.then(function (data) {
      vm.nivel = data;
    });

    ListartipomaterialService.query().$promise.then(function (data) {
      vm.tipo = data;
    });

    ObtenerMiMaterialService.query().$promise.then(function (data) {
      vm.materiales = data;
      setTimeout(function() {
        for(let i = 0; i < vm.materiales.length; i++) {
          document.getElementById(vm.materiales[i].id).innerHTML = vm.materiales[i].vista_previa;  
        }
      }, 300);
    });

    vm.goMaterial = function (material) { 
       
        $state.go('editdocument', {id: material.id});
 

    };  

  }
})();