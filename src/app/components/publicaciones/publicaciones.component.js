(function () {
	'use strict';

	angular
  	.module('app')
  	.component('publicaciones', {
    	templateUrl: 'app/components/publicaciones/publicaciones.html',
    	controller: publicacionesCtrl,
    	controllerAs: 'vm'
  	});

  	publicacionesCtrl.$inject = ['MaterialService', 'DarFavorito', 'ComentarioService', 'ObtenerFavoritosAnalogosService', '$state'];

  	function publicacionesCtrl(MaterialService, DarFavorito, ComentarioService, ObtenerFavoritosAnalogosService, $state) {
  		var vm = this;
      vm.materiales = {};
      vm.comentarios = {};
      vm.favoritos = {};
      vm.comentario;

      var comentario = JSON.parse('{"idMaterial": ' + 1 + '}');
      //console.log(comentario);

      MaterialService.query().$promise.then(function (data) {
        vm.materiales = data;
        console.log(vm.materiales);
        console.log(vm.materiales.materiales);
        ObtenerFavoritosAnalogosService.query().$promise.then(function (data) {
          vm.favoritos = data;
          console.log("ESTOS SON LOS FAVORITOS!!!")
          console.log(vm.favoritos);

          vm.idfavoritos = vm.favoritos.map(function(i){return i.id_material;});

          if(vm.idfavoritos.length > 0)
          {
            for(var x = 0; vm.materiales.length; x++)
            {
              //if(!vm.materiales.hasOwnProperty(x)) continue;
              console.log(vm.idfavoritos);
              vm.materiales[x].esFavorito = vm.idfavoritos.indexOf(vm.materiales[x].id) > -1;
              console.log(vm.materiales[x]);
             
            }
          }
        });
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