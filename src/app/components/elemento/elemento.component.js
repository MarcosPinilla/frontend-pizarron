(function () {
  'use strict';

  angular
  .module('app')
  .component('elemento', {
    templateUrl: 'app/components/elemento/elemento.html',
    controller: elementoCtrl,
    controllerAs: 'vm'
  });

  function elementoCtrl() {
    var vm = this;
  }
})();