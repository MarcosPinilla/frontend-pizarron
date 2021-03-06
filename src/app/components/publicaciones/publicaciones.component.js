(function () {
  'use strict';

  angular
    .module('app')
    .component('publicaciones', {
      templateUrl: 'app/components/publicaciones/publicaciones.html',
      controller: publicacionesCtrl,
      controllerAs: 'vm'
    });

  publicacionesCtrl.$inject = ['$mdDialog', 'MaterialService', 'CredentialsService', 'DarFavorito', 'CompartirmaterialService', 'ComentarioService', 'ObtenerFavoritosAnalogosService', '$state', '$pusher', 'BuscarNombreProfesorService', '$filter', 'ObtenerContenidoMaterialService'];

  function publicacionesCtrl($mdDialog, MaterialService, CredentialsService, DarFavorito, CompartirmaterialService, ComentarioService, ObtenerFavoritosAnalogosService, $state, $pusher, BuscarNombreProfesorService, $filter, ObtenerContenidoMaterialService) {
    var vm = this;
    vm.materiales = {};
    vm.comentarios = {};
    vm.favoritos = {};
    vm.comentario;
    vm.materialesVarible = {};
    console.log()
    vm.profesorlogeado = CredentialsService.getid();
     console.log(vm.profesorlogeado);
    //vm.loading = false;
    vm.editarComentario = false;
    vm.comentario_id = 0;
    vm.modeloEditarComentario = 'modelo para eitar comentario';

    var comentario = JSON.parse('{"idMaterial": ' + 1 + '}');

    var originatorEv;

    vm.openMenu = function($mdMenu, ev) {
      originatorEv = ev;
      $mdMenu.open(ev);
    };

    MaterialService.query().$promise.then(function (data) {
      console.log(data);
      vm.materiales = data;
      vm.materialesVarible = data;

     


      setTimeout(function () {
        for (var i = 0; i < vm.materiales.length; i++) {
          document.getElementById(vm.materiales[i].id).innerHTML = vm.materiales[i].vista_previa;
        }
      }, 300);

      ObtenerFavoritosAnalogosService.query().$promise.then(function (data) {
        vm.favoritos = data;
        vm.idfavoritos = vm.favoritos.map(function (i) { return i.id_material; });
        for (var x = 0; x < vm.materiales.length; x++) {
          //if(!vm.materiales.hasOwnProperty(x)) continue;
          if (vm.idfavoritos.length > 0) {
            vm.materiales[x].esFavorito = vm.idfavoritos.indexOf(vm.materiales[x].id) > -1;
          } else {
            vm.materiales[x].esFavorito = false;
          }
        }
        //vm.loading = true;
      });


      for (var i = 0; i < vm.materiales.length; i++) {
        if (vm.materiales[i].comentarios.length > 3) {
          var comentariosTres = [];
          comentariosTres.push(vm.materiales[i].comentarios[vm.materiales[i].comentarios.length -1]);
          comentariosTres.push(vm.materiales[i].comentarios[vm.materiales[i].comentarios.length -2]);
          comentariosTres.push(vm.materiales[i].comentarios[vm.materiales[i].comentarios.length -3]);
          vm.materiales[i].comentarios = comentariosTres;
          vm.materiales[i].botonComentarios = true;
          console.log(comentariosTres);
          console.log(vm.materiales[i]);
        }else {
          vm.materiales[i].botonComentarios = false;
        }
       
      }
      console.log(vm.materiales);

    });



    vm.darFavorito = function (material) {
      DarFavorito.save({ material_id: material.id }).$promise.then(function (data) {
        material.esFavorito = !material.esFavorito;
      });
    };

    vm.indexXD = 0;
    // deberia traer  solo 3 comentarios y despues al presionar el boton traer los comentarios de elemnto (no tiempo)
     vm.cargarComentario = function (index) {
      console.log(index);
      vm.indexXD =index;
        MaterialService.query().$promise.then(function (data) {
          console.log(data);
          var largo = data[vm.indexXD].comentarios.length;
          var j = 0;
          for (var i = largo-1; i > -1; i--) {
            vm.materiales[vm.indexXD].comentarios[j] = data[vm.indexXD].comentarios[i];
            j++;
          }

          vm.materiales[vm.indexXD].botonComentarios = false;
          
      });

     };




    vm.goMaterial = function (id_material) {
      $state.go('editdocument', { id: id_material });
    };

    vm.verDocumento = function () {
    };

    vm.agregarFavoritos = function () {
    };

    vm.comentar = function (idmaterial, texto, index) {
      if (texto != null) {
        var coment = JSON.parse('{"id_material": ' + idmaterial + ', "comentario": ' + '"' + texto + '"' + '}');
        ComentarioService.save(coment);
        vm.materiales[index].botonComentarios = true;
      } else {
        console.log("Comentario vacio.");
      }
    };

    vm.eliminarComentario = function (id) {
      console.log("elimnar comentario");
      ComentarioService.delete({id: id});
      // crear metodo para no repetir 
       MaterialService.query().$promise.then(function (data) {
          vm.materiales = data;



          setTimeout(function () {
            for (var i = 0; i < vm.materiales.length; i++) {
              document.getElementById(vm.materiales[i].id).innerHTML = vm.materiales[i].vista_previa;
            }
          }, 300);

          ObtenerFavoritosAnalogosService.query().$promise.then(function (data) {
            vm.favoritos = data;
            vm.idfavoritos = vm.favoritos.map(function(i){return i.id_material;});
            for(var x = 0; x < vm.materiales.length; x++) {
              //if(!vm.materiales.hasOwnProperty(x)) continue;
              if(vm.idfavoritos.length > 0) {
                vm.materiales[x].esFavorito = vm.idfavoritos.indexOf(vm.materiales[x].id) > -1;
              }else {
                vm.materiales[x].esFavorito = false;
              }
            }
          });


                 vm.materialesVarible = data;
                 console.log(vm.materialesVarible);
     
      for (var i = 0; i < vm.materiales.length; i++) {
        if (vm.materiales[i].comentarios.length > 3) {
          var comentariosTres = [];
          comentariosTres.push(vm.materiales[i].comentarios[vm.materiales[i].comentarios.length -1]);
          comentariosTres.push(vm.materiales[i].comentarios[vm.materiales[i].comentarios.length -2]);
          comentariosTres.push(vm.materiales[i].comentarios[vm.materiales[i].comentarios.length -3]);
          vm.materiales[i].comentarios = comentariosTres;
          vm.materiales[i].botonComentarios = true;
          console.log(comentariosTres);
          console.log(vm.materiales[i]);
        }
       
      }

      console.log(vm.materiales);
        });
    };

    vm.preEditarComentario = function (id, comentario) {
      vm.editarComentario = true;
      console.log(comentario);
      vm.modeloEditarComentario = comentario;
      console.log(vm.modeloEditarComentario);
      vm.comentario_id = id;
    };

    vm.actualizarComentario = function (comentario) {
      var comentarioOB = {};
      comentarioOB.comentario = comentario;
      console.log(comentarioOB);
      ComentarioService.update({id: vm.comentario_id}, comentarioOB, function () {


        // crear metodo para no repetir 
       MaterialService.query().$promise.then(function (data) {
          vm.materiales = data;



          setTimeout(function () {
            for (var i = 0; i < vm.materiales.length; i++) {
              document.getElementById(vm.materiales[i].id).innerHTML = vm.materiales[i].vista_previa;
            }
          }, 300);

          ObtenerFavoritosAnalogosService.query().$promise.then(function (data) {
            vm.favoritos = data;
            vm.idfavoritos = vm.favoritos.map(function(i){return i.id_material;});
            for(var x = 0; x < vm.materiales.length; x++) {
              //if(!vm.materiales.hasOwnProperty(x)) continue;
              if(vm.idfavoritos.length > 0) {
                vm.materiales[x].esFavorito = vm.idfavoritos.indexOf(vm.materiales[x].id) > -1;
              }else {
                vm.materiales[x].esFavorito = false;
              }
            }
          });


                 vm.materialesVarible = data;
                 console.log(vm.materialesVarible);
     
      for (var i = 0; i < vm.materiales.length; i++) {
        if (vm.materiales[i].comentarios.length > 3) {
          var comentariosTres = [];
          comentariosTres.push(vm.materiales[i].comentarios[vm.materiales[i].comentarios.length -1]);
          comentariosTres.push(vm.materiales[i].comentarios[vm.materiales[i].comentarios.length -2]);
          comentariosTres.push(vm.materiales[i].comentarios[vm.materiales[i].comentarios.length -3]);
          vm.materiales[i].comentarios = comentariosTres;
          vm.materiales[i].botonComentarios = true;
          console.log(comentariosTres);
          console.log(vm.materiales[i]);
        }
       
      }

      console.log(vm.materiales);
        });
      }, function () {});
    };


    function dialogoController($mdDialog, idmaterial, CompartirmaterialService, BuscarNombreProfesorService) {
      var vm = this;
      vm.profesores = {};
      vm.nombre_profesor = null;
      vm.selected_profesor = null;
      vm.answercompartir = "";
      vm.answerb = false;

      vm.compartirMaterial = function (profesorid) {
        if (vm.selected_profesor == null) {
          console.log("No se ha seleccionado profesor");
          return;
        }
        var compartir = JSON.parse('{"id_material": ' + idmaterial + ', "id_seguidor": ' + profesorid + '}');
        CompartirmaterialService.save(compartir).$promise.then(function (data) {
          vm.answer("Material compartido con exito");
        });
      };

      vm.hide = function () {
        vm.answercompartir = ""
        vm.answerb = false;
        $mdDialog.hide();
      };

      vm.cancel = function () {
        $mdDialog.cancel();
      };

      vm.answer = function (answer) {
        vm.answercompartir = "Material compartido con exito";
        vm.answerb = true;
        setTimeout(function () {
          $mdDialog.hide();
        }, 2000);
      };

      vm.error = function (answer) {
        vm.answercompartir = "Error al compartir el material, intentelo denuevo";
      }

      vm.buscarProfesor = function () {
        BuscarNombreProfesorService.query({ nombre: vm.nombre_profesor }).$promise.then(function (data) {
          vm.profesores = data;
        });
      };

    };

    vm.token = CredentialsService.getToken();


    var client = new Pusher('8cf3e9d7177ccf05dfc7', {
      cluster: 'us2',
      key: 'd1bb6663ea1a94de9df7',
      encrypted: true
    });

    var pusher = $pusher(client);

    var canal2 = pusher.subscribe('comentario');


    canal2.bind('ComentarioEvent',
      function (data) {

        MaterialService.query().$promise.then(function (data) {
          vm.materiales = data;



          setTimeout(function () {
            for (var i = 0; i < vm.materiales.length; i++) {
              document.getElementById(vm.materiales[i].id).innerHTML = vm.materiales[i].vista_previa;
            }
          }, 300);

          ObtenerFavoritosAnalogosService.query().$promise.then(function (data) {
            vm.favoritos = data;
            vm.idfavoritos = vm.favoritos.map(function(i){return i.id_material;});
            for(var x = 0; x < vm.materiales.length; x++) {
              //if(!vm.materiales.hasOwnProperty(x)) continue;
              if(vm.idfavoritos.length > 0) {
                vm.materiales[x].esFavorito = vm.idfavoritos.indexOf(vm.materiales[x].id) > -1;
              }else {
                vm.materiales[x].esFavorito = false;
              }
            }
          });


                 vm.materialesVarible = data;
                 console.log(vm.materialesVarible);
     
      for (var i = 0; i < vm.materiales.length; i++) {
        if (vm.materiales[i].comentarios.length > 3) {
          var comentariosTres = [];
          comentariosTres.push(vm.materiales[i].comentarios[vm.materiales[i].comentarios.length -1]);
          comentariosTres.push(vm.materiales[i].comentarios[vm.materiales[i].comentarios.length -2]);
          comentariosTres.push(vm.materiales[i].comentarios[vm.materiales[i].comentarios.length -3]);
          vm.materiales[i].comentarios = comentariosTres;
          vm.materiales[i].botonComentarios = true;
          console.log(comentariosTres);
          console.log(vm.materiales[i]);
        }
       
      }
      console.log(vm.materiales);
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
          material: material
        }
      })
        .then(function (answer) {
          vm.status = 'Documento:  ' + answer + '.';
        }, function () {
          vm.status = 'CANCELADO';
        });
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
      vm.answercompartir = "";
      vm.answerb = false;

      vm.compartirMaterial = function (profesorid) {
        if (vm.selected_profesor == null) {
          console.log("No se ha seleccionado profesor");
          return;
        }
        var compartir = JSON.parse('{"id_material": ' + idmaterial + ', "id_seguidor": ' + profesorid + '}');
        CompartirmaterialService.save(compartir).$promise.then(function (data) {
          vm.answer("Material compartido con exito");
        });
      };

      vm.hide = function () {
        vm.answercompartir = ""
        vm.answerb = false;
        $mdDialog.hide();
      };

      vm.cancel = function () {
        $mdDialog.cancel();
      };

      vm.answer = function (answer) {
        vm.answercompartir = "Material compartido con exito";
        vm.answerb = true;
        setTimeout(function () {
          $mdDialog.hide();
        }, 2000);
      };

      vm.error = function (answer) {
        vm.answercompartir = "Error al compartir el material, intentelo denuevo";
      }

      vm.buscarProfesor = function () {
        BuscarNombreProfesorService.query({ nombre: vm.nombre_profesor }).$promise.then(function (data) {
          vm.profesores = data;
        });
      };

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

    ObtenerContenidoMaterialService.get({ id: vm.material }, function (data) {
      vm.nuevo = data;
      var json = JSONC.unpack(vm.nuevo.contenido_material);
      //json = JSONC.decompress(json);

      //Documento completo sin páginas
      vm.documentoCompleto = json;
      //vm.documentoCompleto = angular.fromJson(vm.nuevo.contenido_material);
      //Inicia en la página 1
      //vm.paginaActual = 1;

      //json = $filter('filter')(json, {id: vm.paginaActual}, true)[0];
      var json = $filter('filter')(vm.documentoCompleto, { id: 1 }, true)[0];
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
        var json = $filter('filter')(vm.documentoCompleto, { id: i }, true)[0];

        //Se carga la página al canvas
        impresion.loadFromJSON(json.data);

        //Se pasa el canvas a imágen
        var dataUrl = impresion.toDataURL();

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