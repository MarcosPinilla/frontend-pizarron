(function () {
  'use strict';

  angular
  .module('app')
  .component('myToolbar', {
    templateUrl: 'app/components/toolbar/toolbar.html',
    controller: toolbarCtrl,
    controllerAs: 'vm'
  });

  toolbarCtrl.$inject = ['CredentialsService', '$rootScope', '$mdDialog', '$state', '$window', 'DarFavorito', 'ListarasignaturasService', 'ListarnivelesService',
   'ListartipomaterialService', 'NotificacionesNoLeidasService', 'CambiarNotificacionesLeidas', 'NotificacionesLeidasService', 'BuscarNombreProfesorService'];

  function toolbarCtrl(CredentialsService, $rootScope, $mdDialog, $state, $window, DarFavorito, ListarasignaturasService, ListarnivelesService,
   ListartipomaterialService, NotificacionesNoLeidasService, BuscarNombreProfesorService) {
    var vm = this;

    vm.usuario = localStorage.getItem("user");
    vm.asignaturas = {};
    vm.niveles = {};
    vm.tipo_material = {};
    vm.profesores = {};
    vm.nombre_profesor = null;

    vm.isinRegister = false;
    vm.isinLogin = false;
    vm.isnotinLogin = false;
    vm.isadmin = false;
    vm.isnotadmin = false;

    vm.iralogin = function () {
      $state.go('login');
    };

    vm.isLogged = CredentialsService.isLogged();
    
    vm.logout = function () {
      CredentialsService.clearCredentials();
      vm.isinLogin = true;
      vm.isnotinLogin = false;
      console.log(vm.isinLogin);
      console.log(vm.isnotinLogin);
      $state.go('login');
    };

    $rootScope.$on('isinRegister', function () {
      vm.isinRegister = true;
    });

    $rootScope.$on('isLogin', function () {
      vm.isLogged = true;
    });

    $rootScope.$on('isinLogin', function () {
      vm.isinLogin = true;
    });

    $rootScope.$on('isnotinLogin', function () {
      vm.isnotinLogin = true;
    });

    $rootScope.$on('isAdmin', function() {
      vm.isadmin = true;
    });

    $rootScope.$on('isnotAdmin', function() {
      vm.isnotadmin = true;
    });

    if(CredentialsService.getRol() == 1){
      vm.isadmin = true;
    }else{
      vm.isadmin = false;
    }

    ListarasignaturasService.query().$promise.then(function (data) {
      vm.asignaturas = data;
    });

    ListarnivelesService.query().$promise.then(function (data) {
      vm.niveles = data;
    });

    ListartipomaterialService.query().$promise.then(function (data) {
      vm.tipo_material = data;
    });

    vm.buscarProfesor = function () {
      BuscarNombreProfesorService.query({id: "Jorge"}).$promise.then(function (data) {
        vm.profesores = data;
        console.log(data);
      });
      console.log("WATASHIWAX! " + vm.nombre_profesor);
      //console.log(vm.profesores);
    };

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
        $mdDialog.show({
          controller: DialogController,
          controllerAs: 'vm',
          templateUrl: 'dialog2.tmpl.html',
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

    function dialogoController($mdDialog, usuario, asignaturas, niveles, tipomaterial, $state, MaterialService) {
      var vm = this;
      vm.usuario = usuario;
      vm.asignaturas = asignaturas;
      vm.niveles = niveles;
      vm.tipo_materiales = tipomaterial;

      vm.material = {};
      vm.material_id = '';

      vm.crearmaterial = function (material) {
        if(material.titulo_material != null && material.id_asignatura != null && material.id_nivel != null && material.id_tipo_material != null && vm.material.id_visibilidad != null) {
          MaterialService.save(material, function (res){
            console.log(res);
            vm.material_id = res.id;
            $state.go('editdocument', {id: res.id});
            $mdDialog.hide();
          },function (err) {
            console.log(err);
          });
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
    console.log("ORETE RA I NEEE!");
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

      /*vm.material = {
        material_id: "2"
      };*/


     /* vm.darFavorito = function(data){
        console.log(data);
      DarFavorito.save(data,function(res){
        console.log('entra');
        $state.go('dashboard');
      },function(err){
        console.log(err);
      });
*/
    }
})();
