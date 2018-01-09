(function () {
  'use strict';

  angular
  .module('app')
  .component('landing', {
    templateUrl: 'app/components/landing/landing.html',
    controller: landingCtrl,
    controllerAs: 'vm'
  });

  landingCtrl.$inject = ['$location'];

  function landingCtrl($location) {
    var vm = this;
    vm.banner = 'app/resources/img/banner1.jpg';
    vm.documento = 'app/resources/img/documento_mockup.jpg';
    vm.buscador = 'app/resources/img/buscador_mockup.png';
    vm.favoritos = 'app/resources/img/favoritos_mockup.png';
    vm.perfil = 'app/resources/img/perfil_mockup.png';
    vm.isLanding = false;
    if ($location.path() === '/home') {
      vm.isLanding = true;
    }
    

    vm.cambiar = function () {
      switch (vm.banner) {
        case 'app/resources/img/banner1.jpg':
          vm.banner = 'app/resources/img/banner2.jpg';
          break;
        case 'app/resources/img/banner2.jpg':
          vm.banner = 'app/resources/img/banner3.jpg';
          break;
        case 'app/resources/img/banner3.jpg':
          vm.banner = 'app/resources/img/banner1.jpg';
          break;
      }
      
    }
  }
})();
