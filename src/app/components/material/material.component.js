(function () {
  'use strict';

  angular
  .module('app')
  .component('material', {
    templateUrl: 'app/components/material/material.html',
    controller: materialCtrl,
    controllerAs: 'vm'
  });

  materialCtrl.$inject = ['MaterialService'];

  function materialCtrl(MaterialService) {
    var vm = this;

    vm.materiales = {};
  }
})();