(function () {
  'use strict';

  angular
    .module('app')
    .component('perfil', {
      templateUrl: 'app/components/perfil/perfil.html',
      controller: perfilCtrl,
      controllerAs: 'vm'
    });

  perfilCtrl.$inject = ['$mdDialog', 'ProfesorService', 'ObtenerMejoresFavoritos', 'FollowService', 'UnfollowService', '$stateParams', 'PerfilService', 'AmigoService', 'SeguidorService', 'SolicitudService', 'MaterialRecientelService', 'ObtenerFavoritosAnalogosService', 'PlanificacionPerfilService', 'DarFavorito', '$state', '$rootScope'];

  function perfilCtrl($mdDialog, ProfesorService, ObtenerMejoresFavoritos, FollowService, UnfollowService, $stateParams, PerfilService, AmigoService, SeguidorService, SolicitudService, MaterialRecientelService, ObtenerFavoritosAnalogosService, PlanificacionPerfilService, DarFavorito, $state, $rootScope) {
    var vm = this;
    vm.perfil = {};
    vm.amistad = {};
    vm.mejoresFavoritos = {};
    vm.materialreciente = {};
    vm.planificaciones = {};
    vm.isUser = false;
    vm.isSolicitado = false;  
    vm.seguido = false;
    /*
      0 = No amigo
      1 = Amigo
      2 = Amistad pendiente
    */
    vm.estadoAmistad = 0;

    $rootScope.$on('Solicitud', function () {
      vm.estadoAmistad = 2;
    });

    $rootScope.$on('EliminarAmistad', function () {
      vm.estadoAmistad = 0;
    });

    $rootScope.$on('AceptarSolicitud', function () {
      vm.estadoAmistad = 1;
    });

    $rootScope.$on('Siguiendo', function () {
      vm.seguido = true;
    });

    $rootScope.$on('DesSiguiendo', function () {
      vm.seguido = false;
    });

    $rootScope.$on('EliminarSolicitud', function () {
      vm.estadoAmistad = 0;
      vm.isSolicitado = false;
    });

    vm.isSeguido = false;

    vm.profesorId = $stateParams.id;

    vm.mejoresFavoritos = ObtenerMejoresFavoritos.get({ id: $stateParams.id });
    vm.mejoresFavoritos.$promise.then(function (data) {
      console.log(data);
      vm.mejoresFavoritos = data;
      setTimeout(function () {
        for (var i = 0; i < vm.mejoresFavoritos.length; i++) {
          document.getElementById(vm.mejoresFavoritos[i].id_material).innerHTML = vm.mejoresFavoritos[i].vista_previa;
        }
      }, 300);

      ObtenerFavoritosAnalogosService.query().$promise.then(function (data) {
        vm.favoritos = data;
        console.log("ESTOS SON LOS FAVORITOS!!!")
        console.log(vm.favoritos);

        vm.idfavoritos = vm.favoritos.map(function (i) { return i.id_material; });

        for (var x = 0; x < vm.mejoresFavoritos.length; x++) {
          //if(!vm.materiales.hasOwnProperty(x)) continue;
          if (vm.idfavoritos.length > 0) {
            console.log(vm.idfavoritos);
            vm.mejoresFavoritos[x].esFavorito = vm.idfavoritos.indexOf(vm.mejoresFavoritos[x].id_material) > -1;
            console.log(vm.materialreciente[x]);
          } else {
            vm.mejoresFavoritos[x].esFavorito = false;
          }
        }
      });
    });

    console.log(vm.profesorId);
    //Si intentamos buscar un perfil
    if (vm.profesorId) {
      ProfesorService.get({ id: vm.profesorId }).$promise.then(function (data) {
        console.log(data);
        if (data.error) {
          vm.perfil.nombres_profesor = data.mensaje;
        }
        else {
          vm.perfil = data;
          console.log(data[0]);
          /*Si el usuario buscado, es el mismo que el usuario logeado*/
          if (vm.perfil.usuario.email == localStorage.getItem('user'))
            vm.isUser = true;
          else
            vm.isUser = false;
          /*Obtiene la amistad entre ambos usuarios*/
          AmigoService.get({ id: vm.profesorId }).$promise.then(function (data) {
            console.log(data);
            if (data.error) {
              vm.amistad = data.mensaje;
              vm.estadoAmistad = 0;
            } else {
              vm.amistad = data;
              vm.estadoAmistad = vm.amistad.id_estado_amistad;
              if (vm.estadoAmistad == 2 && vm.amistad.amigo_2 != vm.perfil.id) {
                vm.isSolicitado = true;
              }
            }
          });
          /*Obtiene la seguimiento entre usuarios*/
          SeguidorService.get({id: vm.profesorId}).$promise.then(function (data) {
            console.log(data);
            if(data.error){
              vm.seguido = false;
            } else {
              vm.seguido = data.seguidor;
            }
            
          });
        }
      });
    } else { //Si la ruta no trae id, entonces es nuestro perfil
      PerfilService.get().$promise.then(function (data) {
        console.log(data);
        vm.perfil = data;
        vm.isUser = true;
      });
    }

    MaterialRecientelService.get({ id: vm.profesorId }).$promise.then(function (data) {
      vm.materialreciente = data;
      console.log(vm.materialreciente);

      ObtenerFavoritosAnalogosService.query().$promise.then(function (data) {
        vm.favoritos = data;
        console.log("ESTOS SON LOS FAVORITOS!!!")
        console.log(vm.favoritos);

        vm.idfavoritos = vm.favoritos.map(function (i) { return i.id_material; });

        for (var x = 0; x < vm.materialreciente.length; x++) {
          //if(!vm.materiales.hasOwnProperty(x)) continue;
          if (vm.idfavoritos.length > 0) {
            console.log(vm.idfavoritos);
            vm.materialreciente[x].esFavorito = vm.idfavoritos.indexOf(vm.materialreciente[x].id) > -1;
            console.log(vm.materialreciente[x]);
          } else {
            vm.materialreciente[x].esFavorito = false;
          }
        }
      });
    });

    PlanificacionPerfilService.query({ id: vm.profesorId }).$promise.then(function (data) {
      vm.planificaciones = data;
      console.log("PLanificaciones:" + vm.planificaciones);

      ObtenerFavoritosAnalogosService.query().$promise.then(function (data) {
        vm.favoritos = data;
        console.log("ESTOS SON LOS FAVORITOS!!!")
        console.log(vm.favoritos);

        vm.idfavoritos = vm.favoritos.map(function (i) { return i.id_material; });

        for (var x = 0; x < vm.planificaciones.length; x++) {
          //if(!vm.materiales.hasOwnProperty(x)) continue;
          if (vm.idfavoritos.length > 0) {
            console.log(vm.idfavoritos);
            vm.planificaciones[x].esFavorito = vm.idfavoritos.indexOf(vm.planificaciones[x].id) > -1;
            console.log(vm.planificaciones[x]);
          } else {
            vm.planificaciones[x].esFavorito = false;
          }
        }
      });
    });

    vm.showEditarPerfil = function (ev, perfil) {
      $mdDialog.show({
        controller: dialogController,
        controllerAs: 'vm',
        templateUrl: 'app/components/perfil/editarperfil.dialogo.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen,
        locals: {
          perfil: perfil,
        },
      })
        .then(function (answer) {
          vm.status = 'Perfil: ' + answer + '.';
        }, function () {
          vm.status = 'CANCELADO';
        });
    };

    function dialogController($scope, $mdDialog, $state, perfil, ProfesorService) {
      var vm = this;

      vm.perfil = perfil;
      vm.profesiones = [{nombre: 'Fonoaudiología'}, {nombre: 'Psicología'}, {nombre: 'Educadora'}, {nombre: 'Otro'}];

      vm.actualizarprofesor = function (profesor) {
        vm.profesor = profesor;
        ProfesorService.update({ id: vm.profesor.id }, profesor, function () {
          vm.hide();
        }, function () { });
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
    };

    vm.showCloseUp = function (ev, vista_previa) {
      $mdDialog.show({
        controller: closeUpController,
        controllerAs: 'vm',
        templateUrl: 'app/components/materiales/closeUp.dialogo.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen,
        locals: {
          vista_previa: vista_previa,
        },
      })
        .then(function (answer) {
          vm.status = 'Documento:  ' + answer + '.';
        }, function () {
          vm.status = 'CANCELADO';
        });
    };

    function closeUpController($mdDialog, vista_previa) {
      var vm = this;
      vm.vista_previa = vista_previa;

      vm.hide = function () {
        $mdDialog.hide();
      };

      vm.cancel = function () {
        $mdDialog.cancel();
      };

      vm.answer = function (answer) {
        $mdDialog.hide(answer);
      };

    };

    vm.anadiramigo = function(idamigo) {
      var amigo1 = JSON.parse('{"id_amigo": ' + idamigo + '}');
      console.log('{"id_amigo": ' + idamigo + '}');
      AmigoService.save(amigo1).$promise.then(function (data) {
        vm.amistad = data;
        console.log("El amigo se guardo: " + data.id_estado_amistad);
        if(data.id_estado_amistad == 1)
          vm.estadoAmistad = 1;
      });
      $rootScope.$emit('Solicitud');
    };  

    vm.seguir = function(idseguido) {
      console.log("siguiendo");
      var seguido1 = JSON.parse('{"id_seguido": ' + idseguido + '}');
      console.log('{"id_seguido": ' + idseguido + '}');
      FollowService.save(seguido1);
      vm.isSeguido=true;
      $rootScope.$emit('Siguiendo');
    };

    vm.desseguir = function(idseguido) {
      console.log("dessiguiendo");
      var seguido1 = JSON.parse('{"id_seguido": ' + idseguido + '}');
      console.log('{"id_seguido": ' + idseguido + '}');
      UnfollowService.save(seguido1);
      vm.isSeguido=false;
      $rootScope.$emit('DesSiguiendo');
    };

    vm.aceptarSolicitud = function ($idamistad) {
      //console.log('{"id_amistad": ' + $idamistad + ', "opcion": ' + 1 + '}');
      var amistad = JSON.parse('{"id_amistad": ' + $idamistad + ', "opcion": ' + 1 + '}');
      console.log(amistad);
      SolicitudService.save(amistad);
      vm.isSolicitado = false;
      $rootScope.$emit('AceptarSolicitud');
      
    };

    /*AmigoService.get({id: vm.profesorId}).$promise.then(function (data) {
      vm.amistad = data;
      console.log("EL ESTADO ES!: " + vm.amistad.id_estado_amistad);
      if(vm.amistad.id_estado_amistad == 1)
        vm.estadoAmistad = 1;
    });*/


    vm.eliminaramistad = function (id) {
      AmigoService.delete({ id: id });
      AmigoService.get({ id: vm.profesorId }).$promise.then(function (data) {
        vm.amistad = data;
        if (vm.amistad.id_estado_amistad == 1)
          vm.estadoAmistad = 0;
          $rootScope.$emit('EliminarAmistad');
      });
    };

    vm.cancelarSolicitud = function (id) {
      AmigoService.delete({ id: id });
      AmigoService.get({ id: vm.profesorId }).$promise.then(function (data) {
        vm.amistad = data;
        if (vm.amistad.id_estado_amistad == 1)
          vm.estadoAmistad = 0;
          $rootScope.$emit('EliminarSolicitud');
      });
    };

    vm.goMaterial = function (materialid) {
      $state.go('editdocument', { id: materialid });
    };

    vm.goPlanificacion = function (material) {
      $state.go('editplanificacion', { id: material.id });
    };

    vm.darFavorito = function (material) {
      DarFavorito.save({ material_id: material.id }).$promise.then(function (data) {
        material.esFavorito = !material.esFavorito;
        if (material.esFavorito)
          material.cantidad += 1;
        else
          material.cantidad -= 1;
      });
    };


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
        controller: dialogoCompartirController,
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


        function dialogoCompartirController($mdDialog, idmaterial, CompartirmaterialService, BuscarNombreProfesorService) {
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

    /*function getUrlParameter(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      var results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };*/
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