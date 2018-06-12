(function () {
	'use strict';

	angular
  	.module('app')
  	.component('publicaciones', {
    	templateUrl: 'app/components/publicaciones/publicaciones.html',
    	controller: publicacionesCtrl,
    	controllerAs: 'vm'
  	});

  	publicacionesCtrl.$inject = ['$mdDialog', 'MaterialService', 'CredentialsService','DarFavorito', 'CompartirmaterialService', 'ComentarioService', 'ObtenerFavoritosAnalogosService', '$state', '$pusher', 'BuscarNombreProfesorService', '$filter', 'ObtenerContenidoMaterialService'];

  	function publicacionesCtrl($mdDialog, MaterialService, CredentialsService, DarFavorito, CompartirmaterialService, ComentarioService, ObtenerFavoritosAnalogosService, $state, $pusher, BuscarNombreProfesorService, $filter, ObtenerContenidoMaterialService) {
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
        if(texto != null) {
        var coment = JSON.parse('{"id_material": ' + idmaterial + ', "comentario": ' + '"' + texto + '"' + '}');
        ComentarioService.save(coment); 
        } else {
          console.log("Comentario vacio.");
        }
      };

      vm.showNewDocument = function (ev, idmaterial, CompartirmaterialService, BuscarNombreProfesorService) {
        $mdDialog.show({
          controller: dialogoController,
          controllerAs: 'vm',
          templateUrl: 'app/components/publicaciones/compartirmaterial.dialogo.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
          locals: {
            idmaterial: idmaterial,
          },
        })
        .then(function (answer) {
          vm.status = 'Documento:  ' + answer + '.';
        }, function () {
          vm.status = 'CANCELADO';
        });
      };

      function dialogoController($mdDialog, idmaterial, CompartirmaterialService, BuscarNombreProfesorService) {
        var vm = this;
        vm.profesores = {};
        vm.nombre_profesor = null;
        vm.selected_profesor = null;

        /*vm.compartirMaterial = function(profesorid) {
          if(vm.selected_profesor == null) {
            console.log("No se ha seleccionado profesor");
            return;
          }
          console.log(profesorid);
          console.log(idmaterial);
          var compartir = JSON.parse('{"id_material": ' + idmaterial + ', "id_seguidor": ' + profesorid + '}');
          CompartirmaterialService.save(compartir);
        };*/

        vm.hide = function () {
          $mdDialog.hide();
        };

        vm.cancel = function () {
          $mdDialog.cancel();
        };

        vm.answer = function (answer) {
          $mdDialog.hide(answer);
        };

        vm.buscarProfesor = function () {
          BuscarNombreProfesorService.query({nombre: vm.nombre_profesor}).$promise.then(function (data) {
          vm.profesores = data;
        });
    };

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


    vm.imprimirDocumento = function (material, event) {
      $mdDialog.show({
        controller: dialogoImprimirController,
        controllerAs: 'vm',
        templateUrl: 'app/components/publicaciones/imprimir.dialogo.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          material : material
        }
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
      }, function () {
        vm.status = 'CANCELADO';
      });
    };


  	}


  function dialogoImprimirController($filter, $mdDialog, material, MaterialService, $state, ObtenerContenidoMaterialService) {
    var vm = this;
    vm.material = material;

    //vm.documento = MaterialService.get({id: vm.material});
  /*  
    MaterialService.query().$promise.then(function (data) {
      vm.materiales = data;
    });
*/

    var canvas = new fabric.Canvas('canvas');
     
    var context = canvas.getContext("2d");

    ObtenerContenidoMaterialService.get({id: vm.material}, function(data) {
      console.log("Obtenido con éxito");
      vm.nuevo = data;
      var json = JSONC.unpack( vm.nuevo.contenido_material);
      //json = JSONC.decompress(json);

       //Documento completo sin páginas
        vm.documentoCompleto = json;
        //vm.documentoCompleto = angular.fromJson(vm.nuevo.contenido_material);
        console.log(vm.documentoCompleto);
        //Inicia en la página 1
        //vm.paginaActual = 1;

      //json = $filter('filter')(json, {id: vm.paginaActual}, true)[0];
      var json = $filter('filter')(vm.documentoCompleto, {id: 1}, true)[0];
      console.log(json);
      canvas.loadFromJSON(json.data); 
        
         //Se inicializa el arreglo con las páginas a imprimir
      var paginas = [];
      
      //Se itera entre todas las páginas creadas
      for (var i = 1; i <= vm.documentoCompleto.length - 1; i++) {
        
        //Se crea nuevo canvas, para no modificar el de la edición
        var impresion = new fabric.Canvas('c');

        //Se cambia el tamaño (Validar)
        impresion.setHeight(1122);
        impresion.setWidth(794);

        //Se obtiene la página de la iteración
        var json = $filter('filter')(vm.documentoCompleto, {id: i}, true)[0];

        //Se carga la página al canvas
        impresion.loadFromJSON(json.data);
        
        //Se pasa el canvas a imágen
        let dataUrl = impresion.toDataURL();
        
        //Se añade al arreglo
        paginas.push(dataUrl);
  
      }

            //Se crea la estructura para imprimir
      var windowContent = '<!DOCTYPE html>';
      windowContent += '<html>'
      windowContent += '<head><title></title></head>';
      windowContent += '<body>'
      
      //Mediante una iteración se agregan las páginas a imprimir
      for (var i = 0; i < paginas.length; i++) {
        windowContent += '<img src="' + paginas[i] + '" onload=window.print();window.close();>';
      }
      windowContent += '</body>';
      windowContent += '</html>';
      
      //Se abre el dialogo para imprimir
      var printWin = window.open('', '', 'width=680,height=520');
      printWin.document.open();
      printWin.document.write(windowContent);

      vm.hide();








    });


    vm.imprimirDocumento = function () {
      //MaterialService.save(vm.newmaterial);
      $state.go('administrator.material');
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
})();      