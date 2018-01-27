(function () {
  'use strict';
  angular.module('app')
  .controller('EditarDocumento.controller', editarDocumentoCtrl);

  editarDocumentoCtrl.$inject = ['MaterialService', '$log', '$stateParams'];

  function editarDocumentoCtrl(MaterialService, $log, $stateParams) {
    var vm = this;
    console.log($stateParams.id);

    vm.documento = MaterialService.get({id: $stateParams.id});

    vm.documento.$promise.then(function(data){
      console.log(data);
      vm.documento = data;
      console.log(vm.documento.titulo_material);
    });
  }
})();