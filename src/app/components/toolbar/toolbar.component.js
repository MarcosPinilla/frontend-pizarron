(function () {
  'use strict';

  angular
  .module('app')
  .component('myToolbar', {
    templateUrl: 'app/components/toolbar/toolbar.html',
    controller: toolbarCtrl,
    controllerAs: 'vm'
  });

  toolbarCtrl.$inject = ['CredentialsService', '$rootScope', '$state','$window'];

  function toolbarCtrl(CredentialsService, $rootScope, $state, $window) {
    var vm = this;

    vm.isinLogged = false;

    vm.iralogin = function () {
      $state.go('login');
    };

    vm.isLogged = CredentialsService.isLogged();
    vm.logout = function () {
      CredentialsService.clearCredentials();
      vm.isLogged = false;
      $state.go('login');
    };

    $rootScope.$on('isLogin', function () {
      vm.isLogged = true;
    });

    $rootScope.$on('isinLogin', function () {
      vm.isinLogged = true;
    });

    vm.gohome = function () {
      vm.isinLogged = false;
      $state.go('landing');
    }

    vm.doTheBack = function() {
      $window.history.back()
    };
  }
})();
