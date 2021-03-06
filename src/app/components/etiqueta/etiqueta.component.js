(function () {
  'use strict';

  angular
  .module('app')
  .component('etiqueta', {
    templateUrl: 'app/components/etiqueta/etiqueta.html',
    controller: etiquetaCtrl,
    controllerAs: 'vm'
  });

  etiquetaCtrl.$inject = ['$mdDialog', 'EtiquetaService', '$state'];

  function etiquetaCtrl($mdDialog, EtiquetaService, $state) {
    var vm = this;

    
    vm.etiquetas={};

    vm.query = {
      order: 'name',
      limit: 5,
      page: 1
    };

    EtiquetaService.query().$promise.then(function (data) {
      vm.etiquetas = data;
      console.log(vm.etiquetas);
    });

    vm.goToElemento = function(elemento, event) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/elemento/elemento.dialogo.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          elemento: elemento
        }
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
      }, function () {
        vm.status = 'CANCELADO';
      });
    };

    vm.anadiretiqueta = function (etiqueta, event) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/etiqueta/nuevaetiqueta.dialogo.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          etiqueta : etiqueta
        }
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
        EtiquetaService.query().$promise.then(function (data) {
          vm.etiquetas = data;
        });
      }, function () {
        vm.status = 'CANCELADO';
      });
    };

    vm.editaretiqueta = function (etiqueta, event) {
      $mdDialog.show({
        controller: editdialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/etiqueta/editaretiqueta.dialogo.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          etiqueta : etiqueta
        }
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
        EtiquetaService.query().$promise.then(function (data) {
          vm.etiquetas = data;
        });
      }, function () {
        vm.status = 'CANCELADO';
      });
    };

    vm.eliminaretiqueta = function (id) {
      EtiquetaService.delete({id: id});
      EtiquetaService.query().$promise.then(function (data) {
        vm.etiquetas = data;
        console.log(vm.etiquetas);
        $state.go('etiqueta');
      });
    };
  }

  function dialogoController($mdDialog, etiqueta, EtiquetaService, $state) {
    var vm = this;
    vm.etiqueta = etiqueta;
    
    vm.etiquetas = {}; 

    vm.newetiqueta={};

    EtiquetaService.query().$promise.then(function (data) {
      vm.etiquetas = data;
    });

    vm.anadiretiqueta = function () {
      EtiquetaService.save(vm.newetiqueta);
      $state.go('etiqueta');
      vm.hide();
    };

    vm.hide = function () {
      $mdDialog.hide();
    };

    vm.cancel = function () {
      $mdDialog.cancel();
    };

    vm.answer = function (answer) {
      $mdDialog.hide(answer);
    };
  }

  function editdialogoController($mdDialog, etiqueta, EtiquetaService, $state) {
    var vm = this;
    vm.etiqueta = etiqueta;
    
    vm.upetiqueta = {};
    vm.etiquetas = {}; 

    vm.cantidadElementos = vm.etiqueta.elementos.length;    

    vm.editable = false;

    if(vm.cantidadElementos > 0){
      vm.editable = true;
    }

    vm.newetiqueta={};

    console.log(vm.etiqueta);

    EtiquetaService.query().$promise.then(function (data) {
      vm.etiquetas = data;
    });

    vm.actualizaretiqueta = function (laetiqueta) {
      EtiquetaService.update({id: vm.etiqueta.id}, laetiqueta, function () {
        vm.hide();
      }, function () {});
    };

    vm.hide = function () {
      $mdDialog.hide();
    };

    vm.cancel = function () {
      $mdDialog.cancel();
    };

    vm.answer = function (answer) {
      $mdDialog.hide(answer);
    };
  }
})();