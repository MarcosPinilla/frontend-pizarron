(function () {
  'use strict';

  angular
  .module('app')
  .component('myToolbar', {
    templateUrl: 'app/components/toolbar/toolbar.html',
    controller: toolbarCtrl,
    controllerAs: 'vm'
  });

  function toolbarCtrl() {
    var vm = this;
  }
})();
