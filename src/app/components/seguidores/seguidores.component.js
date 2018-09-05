(function () {
    'use strict';
  
    angular
      .module('app')
      .component('seguidores', {
        templateUrl: 'app/components/seguidores/seguidores.html',
        controller: seguidoresCtrl,
        controllerAs: 'vm'
      });
  
    seguidoresCtrl.$inject = ['SeguidoresService', 'SeguidosService', 'PerfilService', '$state'];
  
    function seguidoresCtrl(SeguidoresService, SeguidosService, PerfilService, $state) {
      var vm = this;
      vm.seguidores = {};
      vm.seguidos = {};
      vm.perfil = {};
  
      PerfilService.get().$promise.then(function (data) {
        //console.log(data);
        vm.perfil = data;
      });
  
      SeguidoresService.query().$promise.then(function (data) {
        console.log(data);
        vm.seguidores = data;
      });

      SeguidosService.query().$promise.then(function (data) {
        console.log(data);
        vm.seguidos = data;
      });
  
      vm.verPerfil = function(profesorid) {
        console.log('id del profesor: ' + profesorid);
        $state.go('perfil', {id: profesorid});
      }
  
    }
    
  })();