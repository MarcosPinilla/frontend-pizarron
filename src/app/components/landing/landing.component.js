(function () {
  'use strict';

  angular
  .module('app')
  .component('landing', {
    templateUrl: 'app/components/landing/landing.html',
    controller: landingCtrl,
    controllerAs: 'vm'
  });

  function landingCtrl() {
    var vm = this;
    vm.hola = 'Esta es la landing page';
  }
})();
