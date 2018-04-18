(function () {
	'use strict';

	angular
  	.module('app')
  	.component('publicaciones', {
    	templateUrl: 'app/components/publicaciones/publicaciones.html',
    	controller: publicacionesCtrl,
    	controllerAs: 'vm'
  	});

  	publicacionesCtrl.$inject = ['MaterialService', 'ComentarioService', '$state'];

  	function publicacionesCtrl(MaterialService, ComentarioService) {
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

        setTimeout(function() {
          for(let i = 0; i < vm.materiales.length; i++) {
            document.getElementById(vm.materiales[i].id).innerHTML = "<center><a ui-sref='editdocument({id:" + vm.materiales[i].id + "})'>" + vm.materiales[i].vista_previa + "</a></center>";  
          }
        }, 300);
      });

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