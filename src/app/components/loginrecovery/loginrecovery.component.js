(function () {
  'use strict';

  angular
  .module('app')
  .component('loginrecovery', {
    templateUrl: 'app/components/loginrecovery/loginrecovery.html',
    controller: loginrecoveryCtrl,
    controllerAs: 'vm'
  });

  function loginrecoveryCtrl() {
    var vm = this;
  }
})();
