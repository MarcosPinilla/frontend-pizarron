(function () {
	'use strict';

	angular
  	.module('app')
  	.component('publicaciones', {
    	templateUrl: 'app/components/publicaciones/publicaciones.html',
    	controller: publicacionesCtrl,
    	controllerAs: 'vm'
  	});

  	publicacionesCtrl.$inject = ['MaterialService', 'CredentialsService','DarFavorito', 'ComentarioService', 'ObtenerFavoritosAnalogosService', '$state', '$pusher'];

  	function publicacionesCtrl(MaterialService, CredentialsService, DarFavorito, ComentarioService, ObtenerFavoritosAnalogosService, $state, $pusher) {
  		var vm = this;
      vm.materiales = {};
      vm.comentarios = {};
      vm.favoritos = {};
      vm.comentario;

      var comentario = JSON.parse('{"idMaterial": ' + 1 + '}');

      MaterialService.query().$promise.then(function (data) {
        vm.materiales = data;
        console.log(vm.materiales);
        console.log(vm.materiales.materiales);
        
        setTimeout(function() {
          for(let i = 0; i < vm.materiales.length; i++) {
            document.getElementById(vm.materiales[i].id).innerHTML = vm.materiales[i].vista_previa;  
          }
        }, 300);

        ObtenerFavoritosAnalogosService.query().$promise.then(function (data) {
          vm.favoritos = data;
          console.log("ESTOS SON LOS FAVORITOS!!!")
          console.log(vm.favoritos);

          vm.idfavoritos = vm.favoritos.map(function(i){return i.id_material;});

          for(var x = 0; x < vm.materiales.length; x++) {
            //if(!vm.materiales.hasOwnProperty(x)) continue;
            if(vm.idfavoritos.length > 0) {
              console.log(vm.idfavoritos);
              vm.materiales[x].esFavorito = vm.idfavoritos.indexOf(vm.materiales[x].id) > -1;
              console.log(vm.materiales[x]);
            }else {
              vm.materiales[x].esFavorito = false;
            }
          }
          
        });
      });

      

      vm.darFavorito = function(material) {
        DarFavorito.save({material_id: material.id}).$promise.then(function (data) {
          material.esFavorito = !material.esFavorito;
        });
      };

      vm.goMaterial = function(id_material) {
        $state.go('editdocument', {id: id_material});
      };

      vm.verDocumento = function() {
        console.log('ver documento!');
      };

      vm.agregarFavoritos = function() {
        console.log('Agregado a favoritos');
      };

      vm.comentar = function(idmaterial, texto) {
        var coment = JSON.parse('{"id_material": ' + idmaterial + ', "comentario": ' + '"' + texto + '"' + '}');
        console.log(coment);
        ComentarioService.save(coment);
      };


      vm.token = CredentialsService.getToken();


      var client = new Pusher('28705022aa554d22c965', {
        cluster: 'us2',
                key: '6af7dc41d3b9a2f104d8',
                encrypted: true
              });

      var pusher = $pusher(client);

      var canal2 = pusher.subscribe('comentario');


      canal2.bind('ComentarioEvent',
        function (data) {
          
          MaterialService.query().$promise.then(function (data) {
        vm.materiales = data;
        console.log(vm.materiales);

    
        setTimeout(function() {
          for(let i = 0; i < vm.materiales.length; i++) {
            document.getElementById(vm.materiales[i].id).innerHTML = vm.materiales[i].vista_previa;  
          }
        }, 300);

      });


        });

  	}
})();      