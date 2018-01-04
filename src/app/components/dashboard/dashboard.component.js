(function () {
  'use strict';

  angular
  .module('app')
  .component('dashboard', {
    templateUrl: 'app/components/dashboard/dashboard.html',
    controller: dashboardCtrl,
    controllerAs: 'vm'
  });

  function dashboardCtrl() {
    var vm = this;
  }
})();
