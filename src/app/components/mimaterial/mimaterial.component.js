(function () {
  'use strict';

  angular
  .module('app')
  .component('mimaterial', {
    templateUrl: 'app/components/mimaterial/mimaterial.html',
    controller: mimaterialCtrl,
    controllerAs: 'vm'
  });

  mimaterialCtrl.$inject = [];

  function mimaterialCtrl() {
    var vm = this;
  }
})();