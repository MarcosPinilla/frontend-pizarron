(function () {
	'use strict';

	angular
  	.module('app')
  	.component('mySidebar', {
    	templateUrl: 'app/components/sidebar/sidebar.html',
    	controller: sidebarCtrl,
    	controllerAs: 'vm'
  	});

  	sidebarCtrl.$inject = ['$mdDialog',  'CantidadNotificaciones','ListarasignaturasService', 'ListarnivelesService', 'ListartipomaterialService',
     'PerfilService', 'MaterialService', 'NotificacionesNoLeidasService', 'CambiarNotificacionesLeidas', 'NotificacionesLeidasService'];

  	function sidebarCtrl($mdDialog, CantidadNotificaciones, ListarasignaturasService, ListarnivelesService, ListartipomaterialService, 
      PerfilService, NotificacionesNoLeidasService) {
  		var vm = this;

      vm.usuario = localStorage.getItem("user");
      vm.asignaturas = {};
      vm.niveles = {};
      vm.tipo_material = {};
      vm.perfil = {};
      vm.cantidadNotificaciones = {};

      vm.customFullscreen = true;
      
       PerfilService.get().$promise.then(function (data) {
            vm.perfil = data;
            //console.log(vm.perfil.profesores.url_foto_profesor);
       });

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


       CantidadNotificaciones.get().$promise.then(function (data) {
            console.log(data);
            vm.cantidadNotificaciones = data;

       });



      
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


        

    vm.showAdvanced = function(ev) {

       //  vm.notificaciones = {};

       // NotificacionesNoLeidasService.get().$promise.then(function (data) {
       //      console.log(data);
       //      vm.notificaciones = data;

       // });

        $mdDialog.show({
          controller: DialogController,
          controllerAs: 'vm',
          templateUrl: 'dialog1.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        })
        .then(function(answer) {
          vm.status = 'You said the information was "' + answer + '".';
        }, function() {
          vm.status = 'You cancelled the dialog.';
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
    vm.material_id = '';

    /*console.log(vm.usuario);
    console.log(vm.asignaturas);
    console.log(vm.niveles);
    console.log(vm.tipo_materiales);*/

    vm.crearmaterial = function (material) {
      if(material.titulo_material != null && material.id_asignatura != null && material.id_nivel != null && material.id_tipo_material != null && vm.material.id_visibilidad != null) {
        //console.log(material);
        MaterialService.save(material, function (res){
          console.log(res);
          vm.material_id = res.id;
          $state.go('editdocument', {id: res.id});
          $mdDialog.hide();
        },function (err) {
          console.log(err);
        });
     
        //$state.go('editdocument');
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


  function DialogController($scope, $mdDialog, NotificacionesNoLeidasService, CambiarNotificacionesLeidas, NotificacionesLeidasService) {


    var vm = this;


    vm.notificaciones = {};

       NotificacionesNoLeidasService.get().$promise.then(function (data) {
            console.log(data);
            vm.notificaciones = data;

            CambiarNotificacionesLeidas.get().$promise.then(function (data) {
                console.log(data);


           });

       });


    vm.notificacionesLeidas = {};

       NotificacionesLeidasService.get().$promise.then(function (data) {
            console.log(data);
            vm.notificacionesLeidas = data;


       });

  


    vm.hide = function() {
      $mdDialog.hide();
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };

    vm.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }



})();