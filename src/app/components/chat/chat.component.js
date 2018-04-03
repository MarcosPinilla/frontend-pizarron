(function () {
	'use strict';

	angular
  	.module('app')
  	.component('myChat', {
    	templateUrl: 'app/components/chat/chat.html',
    	controller: chatCtrl,
    	controllerAs: 'vm'
  	});

  	chatCtrl.$inject = ['NotificacionesRecientesService'];

  	function chatCtrl(NotificacionesRecientesService) {
  		var vm = this;

      vm.notificaciones = {};

      NotificacionesRecientesService.query().$promise.then(function (data) {
        console.log("NOTIFICACIONEEEEEEEEEEEEEEES!");
        console.log(data);
        vm.notificaciones = data;
      });
  	}
})();