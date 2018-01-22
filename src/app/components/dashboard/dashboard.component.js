(function () {
  'use strict';

  angular
  .module('app')
  .component('dashboard', {
    templateUrl: 'app/components/dashboard/dashboard.html',
    controller: dashboardCtrl,
    controllerAs: 'vm'
  });

  dashboardCtrl.$inject = ['$mdDialog', 'ListarasignaturasService'];

  function dashboardCtrl($mdDialog, ListarasignaturasService) {
    var vm = this;
    vm.usuario = localStorage.getItem("user");
    vm.asignaturas = {};

    vm.customFullscreen = true;

    /*Lista las asignaturas*/
    ListarasignaturasService.query().$promise.then(function (data) {
      vm.asignaturas = data;
    });

    console.log("Tortinos, Tortinos how did you know?");
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

    vm.showNewDocument = function (ev, usuario, asignaturas) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/dashboard/nuevodocumento.dialogo.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          usuario: usuario,
          asignaturas: asignaturas
        },
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
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

  function dialogoController($mdDialog, usuario, asignaturas, $state) {

    //Asignatura
    //Nivel
    //Tipo de material
    var vm = this;
    vm.usuario = usuario;
    vm.asignaturas = asignaturas;
    vm.niveles = {};
    vm.tipo_materiales = {};

    vm.material = {};

    console.log(vm.usuario);
    console.log(vm.asignaturas);

    vm.crearmaterial = function (material) {
      console.log("1337");
      //console.log(material);
      if(material.titulo_material != null && material.asignatura != null && material.nivel != null && material.tipo_material != null) {
        console.log("I TURN MYSELFT IN A TORTINO MORTY! I'M TORTINO RICK!");
        console.log(material);
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

