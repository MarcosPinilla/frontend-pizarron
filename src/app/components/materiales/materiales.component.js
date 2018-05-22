(function () {
  'use strict';

  angular
  .module('app')
  .component('materiales', {
    templateUrl: 'app/components/materiales/materiales.html',
    controller: materialesCtrl,
    controllerAs: 'vm'
  });

  materialesCtrl.$inject = ['PublicMaterialService','AsignaturaService', 'ListarnivelesService', 'ListartipomaterialService', 'DarFavorito', '$state'];

  function materialesCtrl(PublicMaterialService, AsignaturaService, ListarnivelesService, ListartipomaterialService, DarFavorito, $state) {
    var vm = this;

    vm.materiales = {};

    vm.asignatura = {};

    vm.nivel = {};

    PublicMaterialService.query().$promise.then(function (data) {
      vm.materiales = data;
      console.log(vm.materiales);
      setTimeout(function() {
        for(let i = 0; i < vm.materiales.length; i++) {
          document.getElementById(vm.materiales[i].id).innerHTML = vm.materiales[i].vista_previa;  
        }
      }, 300);
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

    vm.goMaterial = function (material) { 
        $state.go('editdocument', {id: material.id});
    };  

    vm.darFavorito = function(data){
      DarFavorito.save(data,function(res){
        console.log(res);
      },function(err){
        console.log(err);
      });
      console.log(data);
    };
  }
})();