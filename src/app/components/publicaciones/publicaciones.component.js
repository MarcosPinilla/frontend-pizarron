(function () {
	'use strict';

	angular
  	.module('app')
  	.component('publicaciones', {
    	templateUrl: 'app/components/publicaciones/publicaciones.html',
    	controller: publicacionesCtrl,
    	controllerAs: 'vm'
  	});

  	//publicacionesCtrl.$inject = ['CredentialsService', '$rootScope', '$state'];

  	function publicacionesCtrl() {
  		var vm = this;
  	}
})();