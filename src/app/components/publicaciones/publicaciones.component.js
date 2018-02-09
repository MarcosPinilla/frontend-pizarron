(function () {
	'use strict';

	angular
  	.module('app')
  	.component('publicaciones', {
    	templateUrl: 'app/components/publicaciones/publicaciones.html',
    	controller: publicacionesCtrl,
    	controllerAs: 'vm'
  	});

  	publicacionesCtrl.$inject = ['obtenerMaterialProfesor', 'DarFavorito','$state'];
  	
    function publicacionesCtrl(obtenerMaterialProfesor, $state) {
  		var vm = this;

      vm.materiales = obtenerMaterialProfesor.get();

      vm.materiales.$promise.then(function(data){
        console.log(data);
        vm.materiales = data;
        
        setTimeout(function() {
          /*for(material in vm.materiales) {
            document.getElementById(material.id).innerHTML = material.vista_previa;  
          } */
          for(let i = 0; i < vm.materiales.length; i++) {
            document.getElementById(vm.materiales[i].id).innerHTML = vm.materiales[i].vista_previa;  
          }
        }, 2000);
      });

      vm.darFavorito = function(data){
        DarFavorito.save(data,function(res){
          console.log(res);
          $state.go('dashboard');
        },function(err){
          console.log(err);
        });
        console.log(data);
    };
  	}
})();