(function () {
  'use strict';

  angular
  .module('app')
  .component('materiales', {
    templateUrl: 'app/components/materiales/materiales.html',
    controller: materialesCtrl,
    controllerAs: 'vm'
  });

  materialesCtrl.$inject = ['PublicMaterialService','AsignaturaService', 'ListarnivelesService', 'ListartipomaterialService', 'ObtenerFavoritosAnalogosService', 'DarFavorito', '$state'];

  function materialesCtrl(PublicMaterialService, AsignaturaService, ListarnivelesService, ListartipomaterialService, ObtenerFavoritosAnalogosService, DarFavorito, $state) {
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

      ObtenerFavoritosAnalogosService.query().$promise.then(function (data) {
          vm.favoritos = data;
          console.log("ESTOS SON LOS FAVORITOS!!!")
          console.log(vm.favoritos);

          vm.idfavoritos = vm.favoritos.map(function(i){return i.id_material;});

          if(vm.idfavoritos.length > 0)
          {
            for(var x = 0; x < vm.materiales.length; x++)
            {
              //if(!vm.materiales.hasOwnProperty(x)) continue;
              console.log(vm.idfavoritos);
              vm.materiales[x].esFavorito = vm.idfavoritos.indexOf(vm.materiales[x].id) > -1;
              console.log(vm.materiales[x]);
             
            }
          }
        });
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

    vm.darFavorito = function(material) {
      DarFavorito.save({material_id: material.id}).$promise.then(function (data) {
        material.esFavorito = !material.esFavorito;
      });
    }

    /*vm.darFavorito = function(data){
      DarFavorito.save(data,function(res){
        console.log(res);
      },function(err){
        console.log(err);
      });
      console.log(data);
    };*/
  }
})();