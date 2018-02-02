(function () {
  'use strict';
  angular.module('app')
  .controller('Documento.controller', documentoCtrl);

  documentoCtrl.$inject = ['MaterialService', '$log', '$stateParams'];

  function documentoCtrl(MaterialService, $log, $stateParams) {
    var vm = this;

  }
})();