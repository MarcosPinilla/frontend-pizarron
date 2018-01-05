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
    vm.banner1 = 'app/resources/img/banner1.jpg';
    vm.documento = 'app/resources/img/documento_mockup.jpg';
    vm.buscador = 'app/resources/img/buscador_mockup.png';
    vm.favoritos = 'app/resources/img/favoritos_mockup.png';
    vm.perfil = 'app/resources/img/perfil_mockup.png';
  }
})();
