(function () {
  'use strict';

  angular
  .module('app')
  .component('login', {
    templateUrl: 'app/components/login/login.html',
    controller: loginCtrl,
    controllerAs: 'vm'
  });

  loginCtrl.$inject = ['LoginService', 'CredentialsService', '$state', '$rootScope', '$mdDialog'];

  function loginCtrl(LoginService, CredentialsService, $state, $rootScope, $mdDialog) {
    var vm = this;

    vm.isLanding = false;
    vm.loginError = false;
    vm.credentials = {};
    var user = {};

    vm.status = '  ';

    vm.login = function (credentials) {
      LoginService.save(credentials, function (data) {
        if(data.token) {
          CredentialsService.setToken(data.token);
          CredentialsService.setUser(data.email);
          $rootScope.$emit('isLogin');
          $state.go('dashboard');
          ObtenerUsuario.get().$promise.then(function (data) {
            user = data.user;
            localStorage.setItem('usuarioLogueado', JSON.stringify(data.user));
            $state.go('dashboard', ({usuario: user.nombre_usuario}));
          });

        }else{
          vm.loginError = true;
        }        
      }, function (error) {
        console.log(error);
      });
    };

    vm.showPrompt = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .title('Ingresa tu email registrado')
      .placeholder('ejemplo@ejemplo.cl')
      .ariaLabel('email')
      .targetEvent(ev)
      .required(true)
      .ok('Enviar')
      .cancel('Cancelar');

    $mdDialog.show(confirm).then(function(result) {
      vm.status = 'EMAIL:  ' + result + '.';
    }, function() {
      vm.status = 'CANCELADO';
    });
  };
  }
})();
