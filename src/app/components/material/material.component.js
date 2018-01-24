(function () {
  'use strict';

  angular
  .module('app')
  .component('material', {
    templateUrl: 'app/components/material/material.html',
    controller: materialCtrl,
    controllerAs: 'vm'
  });

  function materialCtrl() {
    var vm = this;
  }
})();