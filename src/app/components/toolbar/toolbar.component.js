(function () {
  'use strict';

  angular
  .module('app')
  .component('myToolbar', {
    templateUrl: 'app/components/toolbar/toolbar.html',
    controller: toolbarCtrl,
    controllerAs: 'vm'
  });

  toolbarCtrl.$inject =['$state'];

  function toolbarCtrl($state) {
    var vm = this;

    vm.iralogin = function () {
      $state.go('login');
    };
  }
})();
