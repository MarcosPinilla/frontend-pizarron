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
    vm.banner1 = 'app/resources/img/banner1.jpg'
    vm.documento = 'app/resources/img/documento_mockup.jpg'
    vm.banner3 = 'app/resources/img/banner3.jpg'
  }
})();
