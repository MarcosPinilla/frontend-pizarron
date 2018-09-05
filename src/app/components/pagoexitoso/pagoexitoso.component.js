(function () {
	'use strict';

	angular
  	.module('app')
  	.component('pagoexitoso', {
    	templateUrl: 'app/components/pagoexitoso/pagoexitoso.html',
    	controller: pagoexitosoCtrl,
    	controllerAs: 'vm'
  	});

  	pagoexitosoCtrl.$inject = ['CredentialsService','API', '$state', '$rootScope'];

  	function pagoexitosoCtrl(CredentialsService, API, $state, $rootScope) {
        var vm = this;
        
        vm.isinLogin = false;
        vm.isnotinLogin = false;

        $rootScope.$emit('isinLogin'); 

        vm.logout = function () {
            CredentialsService.clearCredentials();
            vm.isinLogin = true;
            vm.isnotinLogin = false;
            $state.go('login');
        };
  	}
})();