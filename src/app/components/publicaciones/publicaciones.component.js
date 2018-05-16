(function () {
	'use strict';

	angular
  	.module('app')
  	.component('publicaciones', {
    	templateUrl: 'app/components/publicaciones/publicaciones.html',
    	controller: publicacionesCtrl,
    	controllerAs: 'vm'
  	});

  	publicacionesCtrl.$inject = ['MaterialService', 'DarFavorito', 'ComentarioService', '$state'];

  	function publicacionesCtrl(MaterialService, DarFavorito, ComentarioService, $state) {
  		var vm = this;
      vm.materiales = {};
      vm.comentarios = {};
      vm.comentario;

      var comentario = JSON.parse('{"idMaterial": ' + 1 + '}');
      //console.log(comentario);

      MaterialService.query().$promise.then(function (data) {
        vm.materiales = data;
        console.log(vm.materiales);
        console.log(vm.materiales.materiales);
      });

      vm.darFavorito = function(id_material) {
        DarFavorito.save({material_id: id_material}).$promise.then(function (data) {
          console.log("se le dio laik a: ");
          console.log(data);
        });
      }

      vm.goMaterial = function(id_material) {
        $state.go('editdocument', {id: id_material});
      }

      vm.verDocumento = function() {
        console.log('ver documento!');
      }

      vm.agregarFavoritos = function() {
        console.log('Agregado a favoritos');
      }

      vm.comentar = function(idmaterial, texto) {
        var coment = JSON.parse('{"id_material": ' + idmaterial + ', "comentario": ' + '"' + texto + '"' + '}');
        console.log(coment);
        ComentarioService.save(coment);
      }
  	}
})();