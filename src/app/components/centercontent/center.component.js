(function () {
	'use strict';

	angular
  	.module('app')
  	.component('myCenter', {
    	templateUrl: 'app/components/centercontent/center.html',
    	controller: centerCtrl,
    	controllerAs: 'vm'
  	});

  	//centerCtrl.$inject = ['CredentialsService', '$rootScope', '$state'];

  	function centerCtrl() {
  		var vm = this;
  	}
})();