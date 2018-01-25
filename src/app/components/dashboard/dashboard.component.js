(function () {
  'use strict';

  angular
  .module('app')
  .component('dashboard', {
    templateUrl: 'app/components/dashboard/dashboardbeta.html',
    controller: dashboardCtrl,
    controllerAs: 'vm'
  });

  dashboardCtrl.$inject = ['$mdDialog', 'ListarasignaturasService', 'ListarnivelesService', 'ListartipomaterialService', 'MaterialService'];

  function dashboardCtrl($mdDialog, ListarasignaturasService, ListarnivelesService, ListartipomaterialService) {
    var vm = this;
    vm.usuario = localStorage.getItem("user");
    vm.asignaturas = {};
    vm.niveles = {};
    vm.tipo_material = {}

    vm.customFullscreen = true;

    /*Lista las asignaturas*/
    ListarasignaturasService.query().$promise.then(function (data) {
      vm.asignaturas = data;
    });

    ListarnivelesService.query().$promise.then(function (data) {
      vm.niveles = data;
    });

    ListartipomaterialService.query().$promise.then(function (data) {
      vm.tipo_material = data;
    });

    //console.log(vm.asignaturas);

    vm.showPrompt = function (ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.prompt()
        .title('Nombre del nuevo Documento')
        .placeholder('Documento sin titulo')
        .ariaLabel('documento')
        .targetEvent(ev)
        .required(true)
        .ok('Crear')
        .cancel('Cancelar');

      $mdDialog.show(confirm).then(function (result) {
        vm.status = 'Documento:  ' + result + '.';
      }, function () {
        vm.status = 'CANCELADO';
      });
    };

    vm.showCalendar = function (ev) {
      $mdDialog.show({
        controller: dialogoController,
        templateUrl: 'app/components/dashboard/calendario.dialogo.html',
        //  parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function (answer) {
        vm.status = 'Calendario:  ' + answer + '.';
      }, function () {
        vm.status = 'CANCELADO';
      });
    };
  }

  function dialogoController($mdDialog, usuario, asignaturas, niveles, tipomaterial, $state, MaterialService) {

    var vm = this;
    vm.usuario = usuario;
    vm.asignaturas = asignaturas;
    vm.niveles = niveles;
    vm.tipo_materiales = tipomaterial;

    vm.material = {};

    /*console.log(vm.usuario);
    console.log(vm.asignaturas);
    console.log(vm.niveles);
    console.log(vm.tipo_materiales);*/

    vm.crearmaterial = function (material) {
      if(material.titulo_material != null && material.id_asignatura != null && material.id_nivel != null && material.id_tipo_material != null && vm.material.id_visibilidad != null) {
        console.log(material);
        MaterialService.save(material)
        $mdDialog.hide();
        $state.go('editdocument');
      }
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

