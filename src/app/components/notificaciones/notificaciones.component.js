(function () {
  'use strict';

  angular
  .module('app')
  .component('notificacion', {
    templateUrl: 'app/components/notificaciones/notificaciones.html',
    controller: notificacionCtrl,
    controllerAs: 'vm'
  });

  //materialCtrl.$inject = ['notificacionService'];

  function notificacionCtrl() {
    var vm = this;
  }


  
})();