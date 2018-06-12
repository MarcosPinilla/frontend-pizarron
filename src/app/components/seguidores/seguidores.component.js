(function () {
    'use strict';
  
    angular
      .module('app')
      .component('seguidores', {
        templateUrl: 'app/components/seguidores/seguidores.html',
        controller: seguidoresCtrl,
        controllerAs: 'vm'
      });
  
    seguidoresCtrl.$inject = ['SeguidoresService', 'PerfilService', '$state'];
  
    function seguidoresCtrl(SeguidoresService, PerfilService, $state) {
      var vm = this;
      vm.seguidores = {};
      vm.perfil = {};
  
      PerfilService.get().$promise.then(function (data) {
        //console.log(data);
        vm.perfil = data;
      });
  
      SeguidoresService.query().$promise.then(function (data) {
        vm.amigos = data;
      });
  
      vm.verPerfil = function(profesorid) {
        console.log('id del profesor: ' + profesorid);
        $state.go('perfil', {id: profesorid});
      }
  
    }
    
  })();