(function () {
  'use strict';

  angular
    .module('app')
    .component('notificacion', {
      templateUrl: 'app/components/notificaciones/notificaciones.html',
      controller: notificacionCtrl,
      controllerAs: 'vm'
    });

  notificacionCtrl.$inject = ['NotificacionService'];

  function notificacionCtrl(NotificacionService) {
    var vm = this;
    vm.notificaciones = {};

    NotificacionService.query().$promise.then(function (data) {
      vm.notificaciones = data;
      console.log(vm.notificaciones);
    });

  }

})();