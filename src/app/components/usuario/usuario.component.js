(function () {
  'use strict';

  angular
  .module('app')
  .component('usuario', {
    templateUrl: 'app/components/usuario/usuario.html',
    controller: usuarioCtrl,
    controllerAs: 'vm'
  });

  function usuarioCtrl() {
    var vm = this;
  }
})();