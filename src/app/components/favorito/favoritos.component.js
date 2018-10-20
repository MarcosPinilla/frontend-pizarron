(function () {
  'use strict';

  angular
    .module('app')
    .component('favoritos', {
      templateUrl: 'app/components/favorito/favoritos.html',
      controller: favoritosCtrl,
      controllerAs: 'vm'
    });

  favoritosCtrl.$inject = ['$mdDialog', 'ObtenerFavoritosProfesor', 'DarFavorito', 'ListarambitosService', 'NucleoByAmbitoService', 'NivelByNucleoService', 'ListartipomaterialService', '$state'];

  function favoritosCtrl($mdDialog, ObtenerFavoritosProfesor, DarFavorito, ListarambitosService, NucleoByAmbitoService, NivelByNucleoService, ListartipomaterialService, $state) {
    var vm = this;

    vm.favoritos = {};

    vm.darFavorito = function (material) {
      console.log(material.id);
      DarFavorito.save({ material_id: material.id }).$promise.then(function (data) {
        material.esFavorito = !material.esFavorito;
        console.log(data);
            ObtenerFavoritosProfesor.query().$promise.then(function (data) {
      console.log(data);
      vm.favoritos = data;
      vm.imagePath = data.vista_previa;
      for (var x = 0; x < vm.favoritos.length; x++) {
        vm.favoritos[x].esFavorito = true;
      }
      console.log(vm.favoritos);
      setTimeout(function () {
        for (var i = 0; i < vm.favoritos.length; i++) {
          document.getElementById(vm.favoritos[i].id).innerHTML = vm.favoritos[i].vista_previa;
        }
      }, 300);
    });
      });
    };

    ObtenerFavoritosProfesor.query().$promise.then(function (data) {
      console.log(data);
      vm.favoritos = data;
      vm.imagePath = data.vista_previa;
      for (var x = 0; x < vm.favoritos.length; x++) {
        vm.favoritos[x].esFavorito = true;
      }
      console.log(vm.favoritos);
      setTimeout(function () {
        for (var i = 0; i < vm.favoritos.length; i++) {
          document.getElementById(vm.favoritos[i].id).innerHTML = vm.favoritos[i].vista_previa;
        }
      }, 300);
    });

    ListarambitosService.query().$promise.then(function (data) {
      vm.ambitos = data;
      console.log(vm.ambitos);
    });

    vm.cargarNucleos = function() {
      var idAmbito = JSON.parse('{"id": ' + vm.filter.objetivo_aprendizaje.nivel.nucleo.ambito.id + '}');
      NucleoByAmbitoService.query(idAmbito).$promise.then(function (data) {
        vm.nucleos = data;
      }); 
    }

    vm.cargarNiveles = function() {
      var idNucleo = JSON.parse('{"id": ' + vm.filter.objetivo_aprendizaje.nivel.nucleo.id + '}');
      NivelByNucleoService.query(idNucleo).$promise.then(function (data) {
        vm.niveles = data;
      });
    }

    ListartipomaterialService.query().$promise.then(function (data) {
      vm.tipo = data;
    });

    vm.goMaterial = function (id_material) {
      $state.go('editdocument', { id: id_material });
    }

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