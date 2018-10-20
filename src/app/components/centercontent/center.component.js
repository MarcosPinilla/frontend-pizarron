(function () {
	'use strict';

	angular
  	.module('app')
  	.component('myCenter', {
    	templateUrl: 'app/components/centercontent/center.html',
    	controller: centerCtrl,
    	controllerAs: 'vm'
  	});

  	centerCtrl.$inject = ['DarFavorito','$state'];

  	function centerCtrl(DarFavorito, $state) {
  		var vm = this;
      vm.material = {
        material_id: "2"
      }


      vm.darFavorito = function(data){
      DarFavorito.save(data,function(res){
        $state.go('dashboard');
      },function(err){
      });

    };
  	}
})();