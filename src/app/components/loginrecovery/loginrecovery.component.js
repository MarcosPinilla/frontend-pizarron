(function () {
  'use strict';

  angular
  .module('app')
  .component('loginrecovery', {
    templateUrl: 'app/components/loginrecovery/loginrecovery.html',
    controller: loginrecoveryCtrl,
    controllerAs: 'vm'
  });

  loginrecoveryCtrl.$inject=['$state', '$rootScope', 'RecoveryService', 'RecoveryCredentialsService'];

  function loginrecoveryCtrl(RecoveryService, RecoveryCredentialsService, $state, $rootScope) {
    var vm = this;

    vm.recoverycredentials = {};

    var url = window.location.href; 
    var value = 'passrecovery/';
    var hash = url.indexOf(value);
    var tokenurl = url.substring(hash + value.length, url.length);
    console.log(tokenurl);


      vm.recover = function (recoverycredentials) {
        RecoveryService.save(recoverycredentials, function (data) {
            if(data.token) {
              RecoveryCredentialsService.setTokenr(tokenurl);
              RecoveryCredentialsService.setEmailr(data.emailr);
              RecoveryCredentialsService.setPasswordr(data.passwordr);
              $rootScope.$emit('isRecover');
              console.log(data);
              /**$state.go('dashboard');
              ObtenerUsuario.get().$promise.then(function (data) {
                user = data.user;
                localStorage.setItem('usuarioLogueado', JSON.stringify(data.user));
                $state.go('dashboard', ({usuario: user.nombre_usuario}));
              });**/

            }else{
            vm.loginError = true;
            }        
          }, function (error) {
            console.log(error);
          }
        );
      };
    
  }
})();
