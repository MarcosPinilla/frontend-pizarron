(function () {
  'use strict';

  angular
    .module('app')
    .component('myToolbar', {
      templateUrl: 'app/components/toolbar/toolbar.html',
      controller: toolbarCtrl,
      controllerAs: 'vm'
    });

  toolbarCtrl.$inject = ['CredentialsService', '$rootScope', '$mdDialog', '$state', 'BuscarNombreProfesorService', 'ListarasignaturasService', 'ListarnivelesService',
    'ListartipomaterialService', 'PrimerasNotificacionesService', 'CantidadNotificaciones', 'CambiarNotificacionesLeidas'];

  function toolbarCtrl(CredentialsService, $rootScope, $mdDialog, $state, BuscarNombreProfesorService, ListarasignaturasService, ListarnivelesService,
    ListartipomaterialService, PrimerasNotificacionesService, CantidadNotificaciones, CambiarNotificacionesLeidas) {
    var vm = this;

    vm.usuario = localStorage.getItem("user");
    vm.asignaturas = {};
    vm.niveles = {};
    vm.tipo_material = {};
    vm.profesores = {};
    vm.nombre_profesor = null;
    vm.selected_profesor = null;
    vm.cantidadNotificaciones = null;

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

    $rootScope.$on('isAdmin', function () {
      vm.isadmin = true;
    });

    $rootScope.$on('isnotAdmin', function () {
      vm.isnotadmin = true;
    });

    if (CredentialsService.getRol() == 1) {
      vm.isadmin = true;
    } else {
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

    CantidadNotificaciones.get().$promise.then(function (data) {
      vm.cantidadNotificaciones = data;
    });

    vm.buscarProfesor = function () {
      BuscarNombreProfesorService.query({ nombre: vm.nombre_profesor }).$promise.then(function (data) {
        vm.profesores = data;
      });
    };

    vm.irPerfil = function () {
      $state.go('dashboard.perfil', { id: vm.selected_profesor.id });
    };

    vm.showNewDocument = function (ev, usuario, asignaturas, niveles, tipomaterial) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/toolbar/nuevodocumento.dialogo.html',
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

    vm.showAdvanced = function (ev) {
      $mdDialog.show({
        controller: DialogController,
        controllerAs: 'vm',
        templateUrl: 'app/components/toolbar/toolbarnotificacion.dialogo.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      })
        .then(function (answer) {
          vm.status = 'You said the information was "' + answer + '".';
        }, function () {
          vm.status = 'You cancelled the dialog.';
          if (vm.cantidadNotificaciones != 0) {
            CambiarNotificacionesLeidas.get().$promise.then(function (data) {
              if (data) {
                vm.cantidadNotificaciones.notificaciones = 0;
              }
            });
          };
        });
    };

    function dialogoController($mdDialog, usuario, asignaturas, niveles, tipomaterial, $state, MaterialService, CambiarNotificacionesLeidas, VisibilidadService) {
      var vm = this;
      vm.usuario = usuario;
      vm.asignaturas = asignaturas;
      vm.niveles = niveles;
      vm.tipo_materiales = tipomaterial;

      vm.material = {};
      vm.material_id = '';

      VisibilidadService.query().$promise.then(function (data) {
        vm.visibilidades = data;
        console.log(vm.visibilidades);
      });

      vm.modeloVisibilidad = null;
      vm.updateVisibilidad = function(id) {
        console.log(id.id);
        var data = {};
        data.id_visibilidad = id.id;
        console.log(data);
        vm.material.id_visibilidad=data.id_visibilidad;
      }

      vm.crearmaterial = function (material) {
        if (material.titulo_material != null && material.id_asignatura != null && material.id_nivel != null && material.id_tipo_material != null && vm.material.id_visibilidad != null) {
          MaterialService.save(material, function (res) {
            console.log(res);
            vm.material_id = res.id;
            $state.go('editdocument', { id: res.id });
            $mdDialog.hide();
          }, function (err) {
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

    function DialogController($scope, $mdDialog, $state, PrimerasNotificacionesService) {
      var vm = this;
      vm.notificaciones = {};

      PrimerasNotificacionesService.query().$promise.then(function (data) {
        console.log(data);
        vm.notificaciones = data;
      });

      vm.verNotificaciones = function () {
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
  }
})();
