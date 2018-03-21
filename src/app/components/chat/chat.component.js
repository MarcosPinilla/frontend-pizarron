(function () {
	'use strict';

	angular
  	.module('app')
  	.component('myChat', {
    	templateUrl: 'app/components/chat/chat.html',
    	controller: chatCtrl,
    	controllerAs: 'vm'
  	});

  	chatCtrl.$inject = ['NotificacionesNoLeidasService', 'CambiarNotificacionesLeidas'];

  	function chatCtrl(NotificacionesNoLeidasService, CambiarNotificacionesLeidas) {
  		var vm = this;

      vm.notificaciones = {};

      NotificacionesNoLeidasService.get().$promise.then(function (data) {
        console.log("NOTIFICACIONEEEEEEEEEEEEEEES!");
        console.log(data);
        vm.notificaciones = data;
        CambiarNotificacionesLeidas.get().$promise.then(function (data) {
          console.log(data);
        });
      });
  	}
})();