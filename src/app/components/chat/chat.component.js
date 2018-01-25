(function () {
	'use strict';

	angular
  	.module('app')
  	.component('myChat', {
    	templateUrl: 'app/components/chat/chat.html',
    	controller: chatCtrl,
    	controllerAs: 'vm'
  	});

  	//chatCtrl.$inject = ['CredentialsService', '$rootScope', '$state'];

  	function chatCtrl() {
  		var vm = this;
  	}
})();