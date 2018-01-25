(function () {
	'use strict';

	angular
  	.module('app')
  	.component('mySidebar', {
    	templateUrl: 'app/components/sidebar/sidebar.html',
    	controller: sidebarCtrl,
    	controllerAs: 'vm'
  	});

  	sidebarCtrl.$inject = ['$mdDialog', 'ListarasignaturasService', 'ListarnivelesService', 'ListartipomaterialService', 'MaterialService'];

  	function sidebarCtrl($mdDialog, ListarasignaturasService, ListarnivelesService, ListartipomaterialService) {
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

      console.log("Bust a move!");
      

      vm.showNewDocument = function (ev, usuario, asignaturas, niveles, tipomaterial) {
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
            asignaturas: asignaturas,
            niveles: niveles,
            tipomaterial: tipomaterial
          },
        })
        .then(function (answer) {
          vm.status = 'Documento:  ' + answer + '.';
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