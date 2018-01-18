(function () {
  'use strict';

  angular
  .module('app')
  .component('establecimiento', {
    templateUrl: 'app/components/establecimiento/establecimiento.html',
    controller: establecimeintoCtrl,
    controllerAs: 'vm'
  });

  function establecimeintoCtrl() {
    var vm = this;
  }
})();