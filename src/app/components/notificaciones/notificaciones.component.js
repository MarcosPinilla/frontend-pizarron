(function () {
  'use strict';

  angular
    .module('app')
    .component('notificacion', {
      templateUrl: 'app/components/notificaciones/notificaciones.html',
      controller: notificacionCtrl,
      controllerAs: 'vm'
    });

  notificacionCtrl.$inject = ['NotificacionService', 'CambiarNotificacionesLeidas'];

  function notificacionCtrl(NotificacionService, CambiarNotificacionesLeidas) {
    var vm = this;
    vm.notificaciones = {};
    vm.cantidadNotificaciones = null;

    if (vm.cantidadNotificaciones != 0) {
      CambiarNotificacionesLeidas.get().$promise.then(function (data) {
        if (data) {
          vm.cantidadNotificaciones.notificaciones = 0;
        }
      });
    };

    NotificacionService.query().$promise.then(function (data) {
      vm.notificaciones = data;
      console.log(vm.notificaciones);
    });

  }

})();