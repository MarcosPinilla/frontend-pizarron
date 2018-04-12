(function () {
  'use strict';

  angular
  .module('app')
  .component('myToolbar', {
    templateUrl: 'app/components/toolbar/toolbar.html',
    controller: toolbarCtrl,
    controllerAs: 'vm'
  });

  toolbarCtrl.$inject = ['CredentialsService', '$rootScope', '$mdDialog', '$state', '$window', 'DarFavorito', 'ListarasignaturasService', 'ListarnivelesService', 'ListartipomaterialService'];

  function toolbarCtrl(CredentialsService, $rootScope, $mdDialog, $state, $window, DarFavorito, ListarasignaturasService, ListarnivelesService, ListartipomaterialService) {
    var vm = this;

    vm.usuario = localStorage.getItem("user");
    vm.asignaturas = {};
    vm.niveles = {};
    vm.tipo_material = {};

    vm.isinLogged = false;
    vm.noelLogin = false;

    vm.iralogin = function () {
      $state.go('login');
    };

    vm.isLogged = CredentialsService.isLogged();
    
    vm.logout = function () {
      CredentialsService.clearCredentials();
      vm.isLogged = false;
      vm.noelLogin = false;
      $state.go('login');
    };

    $rootScope.$on('isLogin', function () {
      vm.isLogged = true;
    });

    $rootScope.$on('isinLogin', function () {
      vm.isinLogged = true;
    });

    ListarasignaturasService.query().$promise.then(function (data) {
      vm.asignaturas = data;
    });

    ListarnivelesService.query().$promise.then(function (data) {
      vm.niveles = data;
    });

    ListartipomaterialService.query().$promise.then(function (data) {
      vm.tipo_material = data;
      $rootScope.$on('noestoy', function () {
        vm.noelLogin = true;
      });
    });

    /*vm.gohome = function () {
      vm.isinLogged = false;
      $state.go('landing');
    };

    vm.doTheBack = function() {
      $window.history.back()
    };*/

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
