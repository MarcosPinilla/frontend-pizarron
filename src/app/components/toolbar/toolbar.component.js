(function () {
  'use strict';

  angular
    .module('app')
    .component('myToolbar', {
      templateUrl: 'app/components/toolbar/toolbar.html',
      controller: toolbarCtrl,
      controllerAs: 'vm'
    });

  toolbarCtrl.$inject = ['CredentialsService', '$rootScope', '$mdDialog', '$state', 'BuscarNombreProfesorService', 'ListarambitosService', 'NucleoByAmbitoService', 'NivelByNucleoService',
    'ListartipomaterialService', 'PrimerasNotificacionesService', 'CantidadNotificaciones', 'CambiarNotificacionesLeidas',  '$pusher'];

  function toolbarCtrl(CredentialsService, $rootScope, $mdDialog, $state, BuscarNombreProfesorService, ListarambitosService, NucleoByAmbitoService, NivelByNucleoService,
    ListartipomaterialService, PrimerasNotificacionesService, CantidadNotificaciones, CambiarNotificacionesLeidas, $pusher) {
    var vm = this;

    vm.usuario = localStorage.getItem("user");
    vm.ambitos = {};
    vm.nucleos = {};
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

    console.log(vm.usuario);

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

    ListarambitosService.query().$promise.then(function (data) {
      vm.ambitos = data;
      console.log(vm.ambitos);
    });
    

    ListartipomaterialService.query().$promise.then(function (data) {
      vm.tipo_material = data;
    });

    BuscarNombreProfesorService.query({ nombre: "Ma" }).$promise.then(function (data) {
      vm.profesores = data;
    });

         var client = new Pusher('28705022aa554d22c965', {
        cluster: 'us2',
        // authEndpoint: "http://example.com/pusher/auth",
        encrypted: true
      });

     var pusher = $pusher(client);

     var canal = pusher.subscribe('notificacion'+vm.usuario);

     canal.bind('NotificacionesEvent',
      function (data) {
        console.log(data);
        vm.cantidadNotificaciones = data.notificaciones;
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

    vm.showNewDocument = function (ev, usuario, ambitos, nucleos, niveles, tipomaterial) {
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
          ambitos: ambitos,
          nucleos: nucleos,
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

    function dialogoController($mdDialog, usuario, ambitos, nucleos, niveles, tipomaterial, $state, MaterialService, ListarambitosService, CambiarNotificacionesLeidas, VisibilidadService, NucleoByAmbitoService, NivelByNucleoService) {
      var vm = this;

      ListarambitosService.query().$promise.then(function (data) {
        vm.ambitos = data;
      }); 

      vm.usuario = usuario;
      vm.nucleos = nucleos;
      vm.niveles = niveles;
      vm.tipo_materiales = tipomaterial;

      vm.material = {};
      vm.material_id = '';

      console.log(vm.tipo_materiales);

      vm.cargarNucleos = function() {
        var idAmbito = JSON.parse('{"id": ' + vm.material.id_ambito + '}');
        NucleoByAmbitoService.query(idAmbito).$promise.then(function (data) {
          vm.nucleos = data;
        }); 
      }
  
      vm.cargarNiveles = function() {
        var idNucleo = JSON.parse('{"id": ' + vm.material.id_nucleo + '}');
        NivelByNucleoService.query(idNucleo).$promise.then(function (data) {
          vm.niveles = data;
        });
      }

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
        material.id_objetivo = vm.material.id_nivel;
        console.log(material);
        if (material.titulo_material != null && material.id_ambito != null && material.id_nucleo != null && material.id_nivel != null && material.id_tipo_material != null && vm.material.id_visibilidad != null) {
          MaterialService.save(material, function (res) {
            console.log(res);
            vm.material_id = res.id;
            if(material.id_tipo_material == 2){
              console.log("entre a planificacion");
              $state.go('editplanificacion', { id: res.id });
              $mdDialog.hide();
            }else{
              console.log("entre a fichas");
              $state.go('editdocument', { id: res.id });
              $mdDialog.hide();
            }
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
