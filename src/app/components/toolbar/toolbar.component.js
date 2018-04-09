(function () {
  'use strict';

  angular
  .module('app')
  .component('myToolbar', {
    templateUrl: 'app/components/toolbar/toolbar.html',
    controller: toolbarCtrl,
    controllerAs: 'vm'
  });

  toolbarCtrl.$inject = ['CredentialsService', '$rootScope', '$state','$window', 'DarFavorito'];

  function toolbarCtrl(CredentialsService, $rootScope, $state, $window, DarFavorito) {
    var vm = this;

    vm.isinLogged = false;
    vm.noelLogin = false;

    vm.iralogin = function () {
      $state.go('login');
    };

    vm.isLogged = CredentialsService.isLogged();
    vm.logout = function () {
      CredentialsService.clearCredentials();
      vm.isLogged = false;
      vm.noelLogin = false;
      $state.go('login');
    };

    $rootScope.$on('isLogin', function () {
      vm.isLogged = true;
    });

    $rootScope.$on('isinLogin', function () {
      vm.isinLogged = true;
    });

    $rootScope.$on('noestoy', function () {
      vm.noelLogin = true;
    });

    vm.gohome = function () {
      vm.isinLogged = false;
      $state.go('landing');
    }

    vm.doTheBack = function() {
      $window.history.back()
    };



    vm.material = {
        material_id: "2"
      }


      vm.darFavorito = function(data){
        console.log(data);
      DarFavorito.save(data,function(res){
        console.log('entra');
        $state.go('dashboard');
      },function(err){
        console.log(err);
      });

    };

    
  }
})();
