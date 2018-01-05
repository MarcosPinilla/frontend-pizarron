(function () {
  'use strict';

  angular
  .module('app')
  .component('myToolbar', {
    templateUrl: 'app/components/toolbar/toolbar.html',
    controller: toolbarCtrl,
    controllerAs: 'vm'
  });

  toolbarCtrl.$inject =['CredentialsService', '$rootScope','$state'];

  function toolbarCtrl($state) {
    var vm = this;

    vm.iralogin = function () {
      $state.go('login');
    };

    vm.isLogged = CredentialsService.isLogged();
    vm.logout = function () {
      CredentialsService.clearCredentials();
      vm.isLogged = false;
      $state.go('login');
    }

    $rootScope.$on('isLogin', function () {
      vm.isLogged = true;
    })
  }
})();
