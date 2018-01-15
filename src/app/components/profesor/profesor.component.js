(function () {
  'use strict';

  angular
  .module('app')
  .component('profesor', {
    templateUrl: 'app/components/profesor/profesor.html',
    controller: profesorCtrl,
    controllerAs: 'vm'
  });

  function profesorCtrl() {
    var vm = this;
  }
})();
