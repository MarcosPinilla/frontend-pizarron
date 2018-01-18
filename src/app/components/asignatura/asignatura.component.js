(function () {
  'use strict';

  angular
  .module('app')
  .component('asignatura', {
    templateUrl: 'app/components/asignatura/asignatura.html',
    controller: asignaturaCtrl,
    controllerAs: 'vm'
  });

  function asignaturaCtrl() {
    var vm = this;
  }
})();
