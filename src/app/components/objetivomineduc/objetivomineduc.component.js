(function () {
  'use strict';

  angular
  .module('app')
  .component('objetivomineduc', {
    templateUrl: 'app/components/objetivomineduc/objetivomineduc.html',
    controller: objetivomineducCtrl,
    controllerAs: 'vm'
  });

  function objetivomineducCtrl() {
    var vm = this;
  }
})();