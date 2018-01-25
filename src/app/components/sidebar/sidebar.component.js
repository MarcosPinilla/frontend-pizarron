(function () {
	'use strict';

	angular
  	.module('app')
  	.component('mySidebar', {
    	templateUrl: 'app/components/sidebar/sidebar.html',
    	controller: sidebarCtrl,
    	controllerAs: 'vm'
  	});

  	//sidebarCtrl.$inject = ['CredentialsService', '$rootScope', '$state'];

  	function sidebarCtrl() {
  		var vm = this;
  	}
})();