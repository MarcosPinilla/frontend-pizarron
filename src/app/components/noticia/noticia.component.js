(function () {
  'use strict';

  angular
  .module('app')
  .component('noticia', {
    templateUrl: 'app/components/noticia/noticia.html',
    controller: noticiaCtrl,
    controllerAs: 'vm'
  });

 noticiaCtrl.$inject = ['$mdDialog','ListarNoticiasProfesorService','NoticiaService','$state'];

  function noticiaCtrl($mdDialog, ListarNoticiasProfesorService, NoticiaService, $state) {
    var vm = this;

    vm.noticias = {};

    vm.query = {
      order: '-fecha',
      limit: 5,
      page: 1
    };


    ListarNoticiasProfesorService.query().$promise.then(function (data) {
      vm.noticias = data;
      console.log(vm.noticias);
    });

    vm.cambiar = function(){
      $state.go('obtenerNoticiasProfesor');

    }

    vm.nuevaNoticia = function(ev) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/chat/nuevaNoticia.dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          noticia:null
        },
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
         ListarNoticiasProfesorService.query().$promise.then(function (data) {
          vm.noticias = data;
        });
      }, function () {
        vm.status = 'CANCELADO';
      });
    };

    vm.eliminarNoticia = function (id) {
      NoticiaService.delete({id: id});
      ListarNoticiasProfesorService.query().$promise.then(function (data) {
        vm.noticias = data;
        console.log(vm.noticias);
      });
    };
    vm.removing=function(){
      alert("saliendo")
    }
    vm.showing = function(){
      alert("entrando")
    }
    vm.actualizarNoticia = function (noticia, event) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/noticia/actualizarNoticia.dialog.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          noticia : noticia
        }
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
        ListarNoticiasProfesorService.query().$promise.then(function (data) {
          vm.noticias = data;
        });
      }).finally(function () {
         ListarNoticiasProfesorService.query().$promise.then(function (data) {
          vm.noticias = data;
        });
      });
    };


  }

  function dialogoController($mdDialog, NoticiaService,noticia) {
        var vm = this;
      

        vm.noticia={};

        vm.upnoticia=noticia;

        vm.crearNoticia = function () {
          if(vm.noticia.titulo != null && vm.noticia.contenido != null) {
            NoticiaService.save(vm.noticia);
            vm.hide();
          }
        };

        
        vm.actualizarNoticia = function () {
          NoticiaService.update({id: vm.upnoticia.id}, vm.upnoticia, function () {
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