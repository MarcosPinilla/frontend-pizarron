(function () {
  'use strict';

  angular
  .module('app')
  .component('elemento', {
    templateUrl: 'app/components/elemento/elemento.html',
    controller: elementoCtrl,
    controllerAs: 'vm'
  })
  .directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
  }]);

  elementoCtrl.$inject = ['$mdDialog', 'ElementoService'];

  function elementoCtrl($mdDialog, ElementoService) {
    var vm = this;

    vm.elemento={
      descripcion_elemento: "el kratos",
      id_tipo_elemento: 1,
      nombre_archivo: "kratos xd"
    };
    vm.elementos={};

    ElementoService.query().$promise.then(function (data) {
      vm.elementos = data;
      console.log(vm.elementos);
    });

    vm.query = {
      order: 'name',
      limit: 5,
      page: 1
    };

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

    vm.anadirelemento = function (elemento, event) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/elemento/nuevoelemento.dialogo.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          elemento : elemento
        }
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
        ElementoService.query().$promise.then(function (data) {
          vm.elementos = data;
        });
      }, function () {
        vm.status = 'CANCELADO';
      });
    };

    vm.actualizarelemento = function (elemento, event) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/elemento/editarelemento.dialogo.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          elemento : elemento
        }
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
        ElementoService.query().$promise.then(function (data) {
          vm.elementos = data;
        });
      }, function () {
        vm.status = 'CANCELADO';
      });
    };

    vm.eliminarelemento = function (id) {
      ElementoService.delete({id: id}).$promise.then(function (data){
        console.log(data);
      });
      ElementoService.query().$promise.then(function (data) {
        vm.elementos = data;
        console.log(vm.elementos);
      });
    };

    vm.crear = function (){
      ElementoService.save(vm.elemento);
      ElementoService.query().$promise.then(function (data) {
      vm.elementos = data;
      console.log(vm.elementos);
    });
      //console.log("se guardo elemento" + vm.elemento);
    };
  }

  function dialogoController($mdDialog, elemento, ElementoService, $state, EtiquetaService) {
    var vm = this;
    vm.elemento = elemento;
    
    vm.upelemento = {};
    vm.elementos = {};
    
    vm.etiquetas={};

    EtiquetaService.query().$promise.then(function (data) {
      vm.etiquetas = data;
    });

    vm.newelemento={
      id_tipo_elemento: 1
    };

    ElementoService.query().$promise.then(function (data) {
      vm.elementos = data;
    });

    vm.anadirelemento = function () {
      ElementoService.save(vm.newelemento);
      $state.go('administrator.elemento');
      vm.hide();
    };

    vm.actualizaelemento = function (elemento) {
      ElementoService.update({id: vm.elemento.id}, elemento, function () {
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