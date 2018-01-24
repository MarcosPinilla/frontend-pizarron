(function () {
  'use strict';

  angular
  .module('app')
  .component('administrator', {
    templateUrl: 'app/components/administrator/administrator.html',
    controller: administratorCtrl,
    controllerAs: 'vm'
  });

  function administratorCtrl() {
    var vm = this;
  }
})();