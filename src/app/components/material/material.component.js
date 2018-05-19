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

    MaterialService.query().$promise.then(function (data) {
      vm.materiales = data;
      console.log(vm.materiales);
    });

    vm.query = {
      order: 'id',
      limit: 5,
      page: 1
    };
    
  }
})();