(function () {
  'use strict';

  angular
  .module('app')
  .component('loginrecovery', {
    templateUrl: 'app/components/loginrecovery/loginrecovery.html',
    controller: loginrecoveryCtrl,
    controllerAs: 'vm'
  });

  loginrecoveryCtrl.$inject = ['RecoveryService', '$state', '$rootScope'];

  function loginrecoveryCtrl(RecoveryService, $state) {
    var vm = this;

    var url = window.location.href; 
    var value = 'passrecovery/';
    var hash = url.indexOf(value);
    var tokenurl = url.substring(hash + value.length, url.length);
    console.log(tokenurl);

    vm.recover = function (recovery) {
      var reco = {
        token: tokenurl,
        email: recovery.email,
        password: recovery.password
      };
      console.log(reco);  
      RecoveryService.save(reco); 
    };
  }
})();
