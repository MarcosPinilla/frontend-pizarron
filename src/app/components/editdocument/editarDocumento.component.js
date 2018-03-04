(function () {
  'use strict';
  angular.module('app')
  .controller('EditarDocumento.controller', editarDocumentoCtrl)
  .filter('keyboardShortcut', function($window) {
    return function(str) {
      if (!str) return;
      var keys = str.split('-');
      var isOSX = /Mac OS X/.test($window.navigator.userAgent);

      var seperator = (!isOSX || keys.length > 2) ? '+' : '';

      var abbreviations = {
        M: isOSX ? '⌘' : 'Ctrl',
        A: isOSX ? 'Option' : 'Alt',
        S: 'Shift'
      };

      return keys.map(function(key, index) {
        var last = index == keys.length - 1;
        return last ? key : abbreviations[key];
      }).join(seperator);
    };
  });

  editarDocumentoCtrl.$inject = ['MaterialService', '$log', '$stateParams', '$scope', '$mdDialog', 'ActualizarContenidoMaterialService', 'ObtenerContenidoMaterialService', '$timeout', '$filter'];

  function editarDocumentoCtrl(MaterialService, $log, $stateParams, $scope, $mdDialog, ActualizarContenidoMaterialService, ObtenerContenidoMaterialService, $timeout, $filter) {

    var vm = this;

    vm.nombreInicial = "";

    vm.documento = MaterialService.get({id: $stateParams.id});

    vm.documento.$promise.then(function(data){
      vm.documento = data;
      vm.nombreInicial=vm.documento.titulo_material;
      console.log(vm.documento.contenido_material)
      //Forma de iniciar el editar documento
      if (vm.documento.contenido_material !== null) {
        vm.cargar();
      } else {
        //Contador de figuras agregadas
        vm.figuras = 0;
        //Documento completo sin páginas
        vm.documentoCompleto = [];

        //Se agrega el objeto en donde irán los atributos generales del documento
        vm.documentoCompleto.push({
          id: 0,
          figuras: vm.figuras
        });

        //Se agrega el objeto con la primera página del objeto
        var json = canvas.toJSON();
        vm.documentoCompleto.push({
          id: vm.documentoCompleto.length, 
          data: json
        });

        //Inicia en la página 1
        vm.paginaActual = 1;
        }
    });

    //MENU BAR
    vm.settings = {
      printLayout: true,
      showRuler: true,
      showSpellingSuggestions: true,
      presentationMode: 'edit'
    };

    vm.sampleAction = function(name, ev) {
      $mdDialog.show($mdDialog.alert()
        .title(name)
        .textContent('You triggered the "' + name + '" action')
        .ok('Great')
        .targetEvent(ev)
        );
    };
    
      //PRUEBAS CON FABRICJS

      //var panelcanvas = new fabric.Canvas('panelcanvas');
      var canvas = new fabric.Canvas('canvas');
     
      var context = canvas.getContext("2d");


      //context.imageSmoothingQuality = "low" || "medium" || "high"
      context.imageSmoothingQuality = "medium";

      vm.fontTest="";
      vm.fontTest2=0;
      vm.colorElemento="#000000";
      vm.esTexto=true;
      vm.colorSeleccionable=false;
      vm.cortar = false;
      vm.copiar = false;
      vm.pegar=false;
      vm.enCanvas = false;
      var _clipboard = null;
      var ctrlDown=false;


      //En el futuro debería retornarlo de la base de datos vm.tipoHoja = vm.documento.tipoHoja;
      vm.tipoHoja = 1;

      //Se marca la opción de orientación marcada calculandolo en base a la altura y el ancho
      if (canvas.height > canvas.width) {
        vm.orientacion = '1';
      } else {
        vm.orientacion = '2';
      }
/*
      //Documento completo sin páginas
      vm.documentoCompleto = [];

      var json = canvas.toJSON();
      vm.documentoCompleto.push({
        id: vm.documentoCompleto.length + 1, 
        data: json});

      //Inicia en la página 1
      vm.paginaActual = 1;
*/
      var _config = {
        canvasState             : [],
        currentStateIndex       : -1,
        undoStatus              : false,
        redoStatus              : false,
        undoFinishedStatus      : 1,
        redoFinishedStatus      : 1,
        undoButton              : document.getElementById('undo'),
        redoButton              : document.getElementById('redo'),
      };

      vm.fonts = ["Lobster", "Shadows Into Light", "Dancing Script", "Source Code Pro"];
      vm.fontsizes = [];

      for(var i=0;i<100;i++){
        vm.fontsizes.push(i);
      }

      //Función para detectar click en canvas
      
      canvas.on('selection:updated', function(evt) {
        console.log(evt);
        if(evt.target.get('type') === 'textbox'){
        //vm.esTexto=false;
          console.log("hola");
        $scope.$apply(function () {
          vm.esTexto = false;
          vm.colorSeleccionable = true;
          document.getElementById('input-color').value=evt.target.get('fill');
          vm.fontTest2 = evt.target.get('fontSize');
          vm.fontTest = evt.target.get('fontFamily');
        }); 

      }else if (evt.target.get('type') === 'rect'){
        //vm.esTexto=true;
        $scope.$apply(function () {
          vm.esTexto = true;
          vm.colorSeleccionable = true;
          document.getElementById('input-color').value=evt.target.get('fill');
          vm.fontTest = "";
          vm.fontTest2 = 0;

        });
      }else if (evt.target.get('type') === 'image'){
        //vm.esTexto=true;
        $scope.$apply(function () {
          vm.esTexto = true;
          vm.colorSeleccionable = false;
          vm.fontTest = "";
          vm.fontTest2 = 0;
        });
      }else if (evt.target.get('type') === 'circle'){
        //vm.esTexto=true;
        $scope.$apply(function () {
          vm.esTexto = true;
          vm.colorSeleccionable = true;
          document.getElementById('input-color').value=evt.target.get('fill');
          vm.fontTest = "";
          vm.fontTest2 = 0;

        });
      }else if (evt.target.get('type') === 'triangle'){
        //vm.esTexto=true;
        $scope.$apply(function () {
          vm.esTexto = true;
          vm.colorSeleccionable = true;
          document.getElementById('input-color').value=evt.target.get('fill');
          vm.fontTest = "";
          vm.fontTest2 = 0;

        });
      }
    });

      canvas.on('selection:created', function(evt) {
        console.log(evt);
        if(evt.target.get('type') === 'textbox'){
        //vm.esTexto=false;
          console.log("hola");
        $scope.$apply(function () {
          vm.esTexto = false;
          vm.colorSeleccionable = true;
          document.getElementById('input-color').value=evt.target.get('fill');
          vm.fontTest2 = evt.target.get('fontSize');
          vm.fontTest = evt.target.get('fontFamily');
        }); 

      }else if (evt.target.get('type') === 'rect'){
        //vm.esTexto=true;
        $scope.$apply(function () {
          vm.esTexto = true;
          vm.colorSeleccionable = true;
          document.getElementById('input-color').value=evt.target.get('fill');
          vm.fontTest = "";
          vm.fontTest2 = 0;

        });
      }else if (evt.target.get('type') === 'image'){
        //vm.esTexto=true;
        $scope.$apply(function () {
          vm.esTexto = true;
          vm.colorSeleccionable = false;
          vm.fontTest = "";
          vm.fontTest2 = 0;
        });
      }else if (evt.target.get('type') === 'circle'){
        //vm.esTexto=true;
        $scope.$apply(function () {
          vm.esTexto = true;
          vm.colorSeleccionable = true;
          document.getElementById('input-color').value=evt.target.get('fill');
          vm.fontTest = "";
          vm.fontTest2 = 0;

        });
      }else if (evt.target.get('type') === 'triangle'){
        //vm.esTexto=true;
        $scope.$apply(function () {
          vm.esTexto = true;
          vm.colorSeleccionable = true;
          document.getElementById('input-color').value=evt.target.get('fill');
          vm.fontTest = "";
          vm.fontTest2 = 0;

        });
      }
    });


      canvas.on('selection:cleared', function(evt) {
        $timeout(function () {
          vm.esTexto = true;
          vm.colorSeleccionable = false;
          document.getElementById('input-color').value="#000000";
          vm.fontTest = "";
          vm.fontTest2 = 0;
        });
      });

      vm.usarFont = function(font) {
       //alert(font);
       var myfont = new FontFaceObserver(font)
       myfont.load()
       .then(function() {
          // when font is loaded, use it.
          canvas.getActiveObject().set("fontFamily", font);
          canvas.renderAll();
          canvas.trigger('object:modified', {target: canvas.getActiveObject()});
        }).catch(function(e) {
          console.log(e)
          alert('font loading failed ' + font);
        });
      }

      vm.usarFontSize = function(fontsize) {
        canvas.getActiveObject().set("fontSize", fontsize);
        canvas.trigger('object:modified', {target: canvas.getActiveObject()});
        canvas.renderAll();  
      }

       vm.usarColor = function(color) {
        canvas.getActiveObject().setColor(color);
        canvas.trigger('object:modified', {target: canvas.getActiveObject()});
        canvas.renderAll();  
      }
      /*
      //Los bordres no se reescalarán junto con el elemento
  canvas.on({
    'object:scaling': function(e) {
        var obj = e.target;
        obj.strokeWidth = obj.strokeWidth / ((obj.scaleX + obj.scaleY) / 2);
        var activeObject = canvas.getActiveObject();
        activeObject.set('strokeWidth',obj.strokeWidth);
    }
});
      */
      //cuando se seleccione un elemento cualquiera en el canvas, este quedará en el frente
      canvas.on("selection:updated", function (e) {
          canvas.getActiveObject().bringToFront();
          canvas.renderAll();    
      });
      canvas.on("selection:created", function (e) {
          canvas.getActiveObject().bringToFront();
          canvas.renderAll();    
      })
      /*
      //Función que genera un rectángulo sin relleno y con bordes negros
      vm.generarFiguraBordes=function() {
        var rect = new fabric.Rect({
          top : 100,
          left : 100,
          width : 60,
          height : 70,
          fill : '',
          stroke : 'black',
          strokeWidth : 2
        });

          //canvas.add(rect).setActiveObject(rect);
          canvas.add(rect);
        };
*/
        vm.generarFigura=function() {
          if(vm.figuras < 50){
            var rect = new fabric.Rect({
            top : 100,
            left : 100,
            width : 60,
            height : 70,
            fill : '#0066ff'
          });

          //canvas.add(rect).setActiveObject(rect);
          canvas.add(rect);
          //vm.figuras = canvas.getObjects().length;
          vm.figuras++;
          vm.guardar();
        }
        
         
        };

        $scope.$on('agregarImagenRepositorio', function(event, ruta) {
          vm.generarImagen(ruta);

        })

        vm.generarImagen = function(ruta){
          if(vm.figuras < 50){
            fabric.Image.fromURL(ruta, function(img) {
              //var oImg = img.set({ left: 0, top: 0}).scale(0.25);
              img.src=ruta;
              img.scaleToWidth(canvas.getWidth()/4);
              img.scaleToHeight(canvas.getHeight()/4);
              canvas.add(img);
              var a = canvas.setActiveObject(img);
               $scope.$apply(function () {
                //vm.figuras = canvas.getObjects().length;
                vm.figuras++;
              });
              //canvas.add(oImg);
            }, null, '');
            
          }
          
        }

        vm.generarTexto = function() {
          if(vm.figuras < 50){
            var texto = new fabric.Textbox('Escribe aquí', {
              left: 50,
              top: 50,
              width: 150,
              fontSize: 20,
              fontFamily: 'Lobster'
            });

            texto.setControlsVisibility({
              bl: false,
              br: false,
              mb: false,
              mt: false,
              tl: false,
              tr: false,
            });
            canvas.add(texto)
            //canvas.add(texto).setActiveObject(texto);
            console.log(texto);
            //canvas.getActiveObject().set("fontFamily", 'Lobster');
            canvas.renderAll();

            //vm.figuras = canvas.getObjects().length;
            vm.figuras++;
            vm.guardar();
          }
        } 

      vm.generarLinea = function(){
        if(vm.figuras < 50){
           var linea = new fabric.Line([ 250, 125, 250, 175 ], {
            fill: '#ff1a1a',
            stroke: 'red',
            strokeWidth: 5,
            selectable: true
          });

          linea.setControlsVisibility({
            bl: false,
            br: false,
            tl: false,
            tr: false,
            mt: false,
            mb: false,
          });

          canvas.add(linea);

          //vm.figuras = canvas.getObjects().length;
          vm.figuras++;
        }
       
      }

      vm.generarTriangulo = function(){
        if(vm.figuras < 50){
          var triangle = new fabric.Triangle({
            width: 100, 
            height: 100, 
            left: 50,
            top: 300, 
            fill: '#1aa3ff'
          });

          canvas.add(triangle);

          //vm.figuras = canvas.getObjects().length;
          vm.figuras++;
        }
      }

      vm.generarCirculo = function(){
        if(vm.figuras < 50){
          var circle = new fabric.Circle({
            radius: 50,
            left: 275,
            top: 75,
            fill: '#aa80ff'
          });

          canvas.add(circle)

          //vm.figuras = canvas.getObjects().length;
          vm.figuras++;
        }
      }

    vm.eliminar = function() {
      var seleccion = canvas.getActiveObject();

      if(seleccion){
           if (seleccion.type === 'activeSelection') {
        seleccion.forEachObject(function(obj) {
          canvas.remove(obj);
          vm.figuras--;
        });
      } else {
        canvas.remove(seleccion);
        vm.figuras--;
      }

      

      //var activeGroup = canvas.getActiveGroup();
      /*
      if (false) {
        var activeObjects = activeGroup.getObjects();
        for (let i in activeObjects) {
          canvas.remove(activeObjects[i]);

         
        }
        if(vm.esTexto === false){
          $scope.$apply(function () {
            vm.esTexto = true;
            vm.fontTest = "";
            vm.fontTest2 = 0;
          });
        }
        canvas.discardActiveGroup();
        canvas.renderAll();
      } else if(false){
        if(canvas.getActiveObject().get('type') === "textbox"){
            //vm.esTexto=true;
            $scope.$apply(function () {
              vm.esTexto = true;
              vm.fontTest = "";
              vm.fontTest2 = 0;
            });
          }
          canvas.getActiveObject().remove();

        } */

      }

   
      }

    //Se crea una variable a partir del contenedor del canvas, lo que permitirá
    //reconocer las teclas presionadas en el mismo.
    var canvasWrapper = document.getElementById('todocanvas');
    canvasWrapper.tabIndex = 1000;
    canvasWrapper.addEventListener("keydown", function(e){
      e = e || window.event;
      var key = e.which || e.keyCode;
      if(key===46){
        vm.eliminar();
      } else if(e.ctrlKey && key === 67) {
          vm.copy();
      } else if (e.ctrlKey && key === 86) {

        vm.paste();

      } else if (e.ctrlKey && key === 88) {
        vm.cut();
      } else if (e.ctrlKey && key == 90) {
        vm.undo();
      } else if (e.ctrlKey && key == 89) {
        vm.redo();
      }
       $scope.$apply(function () {
          //vm.figuras = canvas.getObjects().length;
                  
        });
    }, false);


    vm.copy = function() {
      if(canvas.getActiveObject()){
        vm.copiar=true;

        //Se copia la selección al clipboard
        canvas.getActiveObject().clone(function(cloned) {
          _clipboard = cloned;
        });

        vm.cortar = false;
      }
      
    }

    //Función para cortar, se llama desde ctrl + x y desde panel de edición
    vm.cut = function() {
      
      
      var seleccion = canvas.getActiveObject();

      if(seleccion){
      vm.copiar=false;
      
      seleccion.clone(function(cloned) {
        _clipboard = cloned;

        if (seleccion.type === 'activeSelection') {
          seleccion.forEachObject(function(obj) {
            canvas.remove(obj);
            vm.figuras--;
          });
        } else {
          canvas.remove(seleccion);
          vm.figuras--;
        }
      });

      //Se actualiza la variable cortar por true, para saber que al pegar, luego se debe vaciar
      //el portapapeles
      vm.cortar = true;

    }

      
    }

    vm.paste = function() {
      if(vm.cortar || vm.copiar){
        // clone again, so you can do multiple copies.
        _clipboard.clone(function(clonedObj) {
          canvas.discardActiveObject();
          clonedObj.set({
            left: clonedObj.left + 10,
            top: clonedObj.top + 10,
            evented: true,
          });
          if (clonedObj.type === 'activeSelection') {
            if(clonedObj._objects.length+vm.figuras <= 50){
              // active selection needs a reference to the canvas.
              clonedObj.canvas = canvas;
              clonedObj.forEachObject(function(obj) {
                canvas.add(obj);
                vm.figuras++;
              });
              // this should solve the unselectability
              clonedObj.setCoords();
            }else{
              return;
            }
          } else {
            if(vm.figuras < 50){
             canvas.add(clonedObj);
             vm.figuras++;
            }else{
              return;
            }
          }
          _clipboard.top += 10;
          _clipboard.left += 10;

          /*
          $scope.$apply(function () {
              vm.figuras = canvas.getObjects().length;
              console.log(vm.figuras);
          });
          */

          canvas.setActiveObject(clonedObj);
          canvas.requestRenderAll();
        });  

        if(vm.cortar) {
          _clipboard = null;
          vm.cortar = false;
        }
      }
      vm.pegar=false;
    }

    canvas.on('object:modified', function() {
      vm.updateCanvasState();
    }
    );

    canvas.on('object:added', function() {
      vm.updateCanvasState();
    }
    );

    vm.updateCanvasState = function() {
      if((_config.undoStatus == false && _config.redoStatus == false)) {
        var jsonData        = canvas.toJSON();
        var canvasAsJson        = JSON.stringify(jsonData);
        if(_config.currentStateIndex < _config.canvasState.length-1) {
          var indexToBeInserted = _config.currentStateIndex+1;
          _config.canvasState[indexToBeInserted] = canvasAsJson;
          var numberOfElementsToRetain = indexToBeInserted+1;
          _config.canvasState = _config.canvasState.splice(0,numberOfElementsToRetain);
        } else {
          _config.canvasState.push(canvasAsJson);
        }
        
        _config.currentStateIndex = _config.canvasState.length-1;
        if((_config.currentStateIndex == _config.canvasState.length-1) && _config.currentStateIndex != -1){
          _config.redoButton.disabled= "disabled";
        }
      }
    }


    vm.undo = function() {
      if(_config.undoFinishedStatus) {
        if(_config.currentStateIndex == -1) {
          _config.undoStatus = false;
        } else {
          if (_config.canvasState.length >= 1) {
            _config.undoFinishedStatus = 0;
            if(_config.currentStateIndex != 0) {
              _config.undoStatus = true;
              canvas.loadFromJSON(_config.canvasState[_config.currentStateIndex-1],function() {
                var jsonData = JSON.parse(_config.canvasState[_config.currentStateIndex-1]);
                canvas.renderAll();
                _config.undoStatus = false;
                _config.currentStateIndex -= 1;
                _config.undoButton.removeAttribute("disabled");

                 $scope.$apply(function () {
                  vm.figuras = canvas.getObjects().length;
                });

                if(_config.currentStateIndex !== _config.canvasState.length-1){
                  _config.redoButton.removeAttribute('disabled');
                }
                _config.undoFinishedStatus = 1;
              });
            } else if(_config.currentStateIndex == 0) {
              canvas.clear();
              _config.undoFinishedStatus = 1;
              _config.undoButton.disabled= "disabled";
              _config.redoButton.removeAttribute('disabled');
              _config.currentStateIndex -= 1;
            }
          }
        }
        
      }
      
    }

    vm.redo = function() {
      if(_config.redoFinishedStatus) {
        if((_config.currentStateIndex == _config.canvasState.length-1) && _config.currentStateIndex != -1) {
          _config.redoButton.disabled= "disabled";
        } else {
          if (_config.canvasState.length > _config.currentStateIndex && _config.canvasState.length != 0) {
            _config.redoFinishedStatus = 0;
            _config.redoStatus = true;
            canvas.loadFromJSON(_config.canvasState[_config.currentStateIndex+1],function() {
              var jsonData = JSON.parse(_config.canvasState[_config.currentStateIndex+1]);
              canvas.renderAll();
              _config.redoStatus = false;
              _config.currentStateIndex += 1;
               $scope.$apply(function () {
                vm.figuras = canvas.getObjects().length;
              });
              if(_config.currentStateIndex != -1) {
                _config.undoButton.removeAttribute('disabled');
              }
              _config.redoFinishedStatus = 1;
              if((_config.currentStateIndex == _config.canvasState.length-1) && _config.currentStateIndex != -1) {
                _config.redoButton.disabled= "disabled";
              }
            });
          }
        }
      
      }
     
    }

    vm.canvasModifiedCallback = function() {
      var json = canvas.toJSON();
      var editado = {
        id: vm.paginaActual,
        data: json
      }

      var json = $filter('filter')(vm.documentoCompleto, {id: vm.paginaActual }, true)[0];

      var idElemento = vm.documentoCompleto.indexOf(json);

      vm.documentoCompleto[idElemento] = editado;


      //vm.documentoCompleto[vm.paginaActual] = editado;

     
        $scope.$apply(function () {
        //vm.figuras = canvas.getObjects().length;
        console.log(vm.figuras);
      }); 
      
      
    };

    vm.canvasModifiedAdd = function() {
      var json = canvas.toJSON();
      var editado = {
        id: vm.paginaActual,
        data: json
      }

      var json = $filter('filter')(vm.documentoCompleto, {id: vm.paginaActual }, true)[0];

      var idElemento = vm.documentoCompleto.indexOf(json);

      vm.documentoCompleto[idElemento] = editado;

      //vm.documentoCompleto[vm.paginaActual] = editado;

      if(vm.pegar){
        vm.pegar=false;
        $timeout(function () {
          //vm.figuras = canvas.getObjects().length;
          console.log(vm.figuras);
          vm.pegar=false;
         }); 

        vm.pegar=false;
      }
      
      
    };

    vm.canvasModified=function(){
      var json = canvas.toJSON();
      var editado = {
        id: vm.paginaActual,
        data: json
      }

      var json = $filter('filter')(vm.documentoCompleto, {id: vm.paginaActual }, true)[0];

      var idElemento = vm.documentoCompleto.indexOf(json);

      vm.documentoCompleto[idElemento] = editado;

      //vm.documentoCompleto[vm.paginaActual] = editado;

    }

    canvas.on('object:removed', vm.canvasModifiedCallback);
    canvas.on('object:added', vm.canvasModifiedAdd);
    canvas.on('object:modified',vm.canvasModified)

      //Subir imágen desde computador
      
      document.getElementById('archivo').addEventListener("change", function (e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (f) {
          var data = f.target.result;                    
          fabric.Image.fromURL(data, function (img) {
          //var oImg = img.set({left: 0, top: 0, angle: 0,width:100, height:100}).scale(0.9);
          img.scaleToWidth(canvas.getWidth()/4);
          img.scaleToHeight(canvas.getHeight()/4);
          canvas.add(img).renderAll();
          var a = canvas.setActiveObject(img);
          //var dataURL = canvas.toDataURL({format: 'png', quality: 0.8});
          $scope.$apply(function () {
            //vm.figuras = canvas.getObjects().length;
            vm.figuras++;
          }); 
        });
        };
        reader.readAsDataURL(file);
        
    
      });
      

      //Subir imágen desde URL (MUESTRA LA IMAGEN PERO NO ESTÁ CORRECTO)
      /*
      vm.subir = function() {
        var URL = document.getElementById("url").value;
        console.log(URL);
        fabric.Image.fromURL(URL, function(imagen) {

        canvas.add(imagen).renderAll();
        var a = canvas.setActiveObject(imagen);
        var dataURL = canvas.toDataURL({format: 'png', quality: 0.8});
      })
    } 
    */
    //delimitación de canvas apra objetos
    
    canvas.on('object:moving', function (e) {
      var obj = e.target;
           // if object is too big ignore
           if(obj.currentHeight > canvas.height || obj.currentWidth > canvas.width){
            return;
          }        
          obj.setCoords();        
          // top-left  corner
          if(obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0){
            obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top);
            obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left);
          }
          // bot-right corner
          if(obj.getBoundingRect().top+obj.getBoundingRect().height  > canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width  > canvas.width){
            obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
            obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
          }
        });

    //DEBERIA DESHABILITAR EL CORS PERO AUN ASI DA PROBLEMAS 
    vm.subir = function() {
      var URL = document.getElementById("url").value;
      fabric.Image.fromURL(URL, function(img) {
        
        img.scaleToWidth(canvas.getWidth()/4);
        img.scaleToHeight(canvas.getHeight()/4);
        canvas.add(img);
          
        $scope.$apply(function () {
          //vm.figuras = canvas.getObjects().length;
          vm.figuras++;
        });
        var a = canvas.setActiveObject(img);
          //canvas.setActiveObject(object);    
        },{crossOrigin: 'Anonymous'});
      
     
    }


    //Lógica para exportar a pdf, utilizando el elemento de canvas
    vm.exportar = function () {
      /*html2canvas(document.getElementById('canvas'), {
        onrendered: function (canvas) {
          var data = canvas.toDataURL();
          console.log(data);
          var docDefinition = {
            content: [{
              image: data,
              width: 500,
            }]
          };
          pdfMake.createPdf(docDefinition).download("test.pdf");
        }
      }); 
      
      ////////////////////////////////////////////////////


      var imgPdfData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf=new jsPDF("p", "mm", "a4");
      var width = pdf.internal.pageSize.width;    
      var height = pdf.internal.pageSize.height;
      pdf.addImage(imgPdfData, 'png', 5, 5,width-10,height-10);
      pdf.save('test.pdf'); */

      //vm.rotar();

      kendo.drawing
        .drawDOM("#canvas", 
        { 
            forcePageBreak: ".page-break", 
            paperSize: "A4",
            margin: { top: "1cm", bottom: "1cm" },
            scale: 0.8,
            height: 500, 
            template: $("#page-template").html(),
            keepTogether: ".prevent-split"
        })
            .then(function(group){
            kendo.drawing.pdf.saveAs(group, "Exported_Itinerary.pdf")
        });


    };

    //Provisorio para tests
    vm.obtener = function() {
      var json = canvas.toJSON();
      console.log(json);

      var svg = canvas.toSVG();
        //console.log(svg);

      var canvasAsJson = JSON.stringify(json);
      console.log(canvasAsJson);
    }
      
    //Provisorio para cargar
    vm.load = function() {
      //var json = document.getElementById("load").value;
      var json='{"objects":[{"type":"textbox","originX":"left","originY":"top","left":265,"top":57,"width":150,"height":22.6,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"Escribe aquí","fontSize":20,"fontWeight":"normal","fontFamily":"Lobster","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","charSpacing":0,"minWidth":20,"styles":{}},{"type":"rect","originX":"left","originY":"top","left":450,"top":125,"width":60,"height":70,"fill":"blue","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"image","originX":"left","originY":"top","left":404,"top":0,"width":480,"height":480,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1.15,"scaleY":1.15,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"crossOrigin":"","alignX":"none","alignY":"none","meetOrSlice":"meet","src":"data:image/png;base64,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","filters":[],"resizeFilters":[]}]}'
      canvas.loadFromJSON(json);
    } 

    //Método utilizado para guardar el documento en la base de datos
    vm.guardar = function(documento) {
      $timeout(function(){
        var editado = {
          id: 0,
          figuras: vm.figuras
        }

        vm.documentoCompleto[0] = editado;
        
        var json = vm.documentoCompleto;
        console.log(json);
        console.log(vm.documentoCompleto);
        //se comprime el json

        /*var jsonComprimido = JSONC.compress( json );
        console.log(jsonComprimido);
        */
        var jsonComprimido = JSONC.pack( json);
        console.log(jsonComprimido);
        var canvasAsJson = JSON.stringify(jsonComprimido);
        console.log(canvasAsJson);
        

        //json = JSON.stringify(json);
        //console.log(json);


        var documentoTemp = {};
        documentoTemp.id = vm.documento.id;
        console.log(vm.documento.titulo_material)
        if(vm.documento.titulo_material != undefined){

          documentoTemp.titulo_material = vm.documento.titulo_material;
          vm.nombreInicial = vm.documento.titulo_material;
        }else{
          vm.documento.titulo_material = vm.nombreInicial;
          documentoTemp.titulo_material = vm.nombreInicial
        }
        
        //Se añade color blanco para la vista previa
        canvas.backgroundColor = 'white';
        var svg = canvas.toSVG({
          width: canvas.width / 3,
          height: canvas.height / 3
        });

        //Se vuelve a hacer transparente
        canvas.backgroundColor = 'transparent';

        documentoTemp.contenido_material=canvasAsJson;
        //documentoTemp.contenido_material = json;
        documentoTemp.vista_previa = svg;
        documentoTemp.id_tipo_material = vm.documento.id_tipo_material;
        documentoTemp.id_asignatura = vm.documento.id_asignatura;
        documentoTemp.id_nivel = vm.documento.id_nivel;
        documentoTemp.id_visibilidad = vm.documento.id_visibilidad;
        

        console.log(documentoTemp)

        //documento.contenido_material = canvasAsJson;
        MaterialService.update({id:vm.documento.id},documentoTemp,function(){
           console.log("Guardado con éxito");
        });
      });
      /*
      ActualizarContenidoMaterialService.update({id: vm.documento.id}, json, function() {
        console.log("Guardado con éxito");
      });
      */
    }


    //Método para cargar el documento ya guardado en la base de datos
    vm.cargar = function() {
      //documento.contenido_material = canvasAsJson;
      ObtenerContenidoMaterialService.get({id: vm.documento.id}, function(data) {
        console.log("Obtenido con éxito");
        vm.nuevo = data;
        var json = JSONC.unpack( vm.nuevo.contenido_material);
        //json = JSONC.decompress(json);

         //Documento completo sin páginas
          vm.documentoCompleto = json;
          //vm.documentoCompleto = angular.fromJson(vm.nuevo.contenido_material);
          console.log(vm.documentoCompleto);
          //Inicia en la página 1
          vm.paginaActual = 1;

        //json = $filter('filter')(json, {id: vm.paginaActual}, true)[0];
        var json = $filter('filter')(vm.documentoCompleto, {id: vm.paginaActual}, true)[0];
        console.log(json);
        canvas.loadFromJSON(json.data); 
        //canvas.loadFromJSON(vm.nuevo.contenido_material);
        //vm.figuras = json.objects.length;
        var figurasObtenidas = $filter('filter')(vm.documentoCompleto, {id: 0}, true)[0];
        vm.figuras = figurasObtenidas.figuras;
        console.log(vm.figuras);
      });

    }
    
    vm.configuracionPagina = function(ev) {
      $mdDialog.show({
        controller: configuracionPaginaController,
        controllerAs: 'vm',
        templateUrl: 'app/components/editdocument/configuracionHoja.dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          orientacion: vm.orientacion,
          tipo: vm.tipoHoja
        },
      })
      .then(function (configuracion) {
        //vm.status = 'Documento:  ' + answer + '.';
        console.log(configuracion);
        console.log(configuracion.tipo_id);
        vm.tamanoHoja(configuracion.tipo_id, configuracion.width, configuracion.height);
        vm.orientacionHoja(configuracion.orientacion);
      }, function () {
        //vm.status = 'CANCELADO';
      });
    };

    //Método para cambiar la orientación de la hoja
    vm.orientacionHoja = function(orientacion) {
      vm.orientacion = orientacion;
      
      //Se valida que no se clickee de nuevo en la opción ya ocupada 
      if ((vm.orientacion === '1' && canvas.height < canvas.width) || (vm.orientacion === '2' && canvas.height > canvas.width)) {
        canvas.setDimensions({width: canvas.height, height: canvas.width}); 
        document.getElementById("contenedor-canvas").style.width=document.getElementById("contenedor-canvas").style.height;
        document.getElementById("contenedor-canvas").style.height=document.getElementById("contenedor-canvas").style.width; 

      }
      
    }

    //Método para cambiar tamaño de la hoja
    vm.tamanoHoja = function(tipo, width, height) {
      vm.tipoHoja = tipo;
      if (canvas.width !== width && canvas.height !== height) {
        canvas.setDimensions({width: width, height: height}); 
        document.getElementById("contenedor-canvas").style.width=width+'px'; 
        document.getElementById("contenedor-canvas").style.height=height+'px';
      }
    }


    $scope.$watch("vm.figuras",function(numero) {
     
      if (numero > 50) {

        setTimeout(function(){
         vm.eliminar() 
        }, 100);
      }
       
     
    });

     vm.mostrarColaborador = function(ev) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/editdocument/agregarcolaborador.dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
          documento: vm.documento
        },
      })
      .then(function (answer) {
        vm.status = 'Documento:  ' + answer + '.';
      }, function () {
        vm.status = 'CANCELADO';
      });
    };
    
    /* Implementar más tarde, el horizontal aún tiene bugs
    vm.rotar = function() {
      $timeout(function() {
        canvas.discardActiveObject();

        var activeObject = new fabric.ActiveSelection(canvas.getObjects(), { canvas: canvas });
        canvas.setActiveObject(activeObject);

        if (activeObject != null) {
            activeObject.rotate(-90);

            canvas.discardActiveObject();

            canvas.renderAll();
            vm.exportar();
            

            // En teoría esto de acá debería reestablecer la vista a la normalidad
            canvas.setActiveObject(activeObject);
            activeObject.rotate(90);

            canvas.discardActiveObject();

            canvas.renderAll();
        }  
      })
      
    } */

     vm.eliminarPagina = function() {
      //se restan las figuras de la página eliminada
      vm.figuras=vm.figuras-canvas.getObjects().length;
      //si es la última página
     if(vm.paginaActual==vm.documentoCompleto.length-1){

      vm.paginaAnterior();

      var json = $filter('filter')(vm.documentoCompleto, {id: vm.documentoCompleto.length-1}, true)[0];

      var idElemento = vm.documentoCompleto.indexOf(json);

      vm.documentoCompleto.splice(idElemento,1);

      
     }else{
      vm.paginaSiguiente();

      vm.paginaActual--;
      for(var i=0;i<vm.documentoCompleto.length;i++){
        console.log(vm.documentoCompleto[i].id+'-'+vm.paginaActual)
        if(vm.documentoCompleto[i].id>vm.paginaActual && vm.documentoCompleto[i].id != 0){
          vm.documentoCompleto[i].id--;
        }

          if(i==vm.documentoCompleto.length-1){


            var json = $filter('filter')(vm.documentoCompleto, {id: vm.paginaActual}, true)[0];

            var idElemento = vm.documentoCompleto.indexOf(json);

            vm.documentoCompleto.splice(idElemento,1);
          }
           
        }
      }


     

      console.log(vm.documentoCompleto);
    }

    vm.nuevaPagina = function() {

     
     canvas.clear();

     if(vm.paginaActual==vm.documentoCompleto.length-1){

      vm.paginaActual++;

      var json = canvas.toJSON();

      vm.documentoCompleto.push({
        id: vm.documentoCompleto.length, 
        data: json});

     }else{


      for(var i=0;i<vm.documentoCompleto.length;i++){
        console.log(vm.documentoCompleto[i].id+'-'+vm.paginaActual)
        if(vm.documentoCompleto[i].id>vm.paginaActual && vm.documentoCompleto[i].id != 0){
          vm.documentoCompleto[i].id++;
        }

        if(i==vm.documentoCompleto.length-1){

          vm.paginaActual++

           var json = canvas.toJSON();
            
            vm.documentoCompleto.push({
              id: vm.paginaActual, 
              data: json});
            break;
           }
           
        }
      }


     

      console.log(vm.documentoCompleto);
    }

    vm.paginaAnterior = function() {
      canvas.clear();
      vm.paginaActual--;
      var json = $filter('filter')(vm.documentoCompleto, {id: vm.paginaActual}, true)[0];
      console.log(json);
      canvas.loadFromJSON(json.data);
    }

    vm.paginaSiguiente = function() {
      canvas.clear();
      vm.paginaActual++;
      var json = $filter('filter')(vm.documentoCompleto, {id: vm.paginaActual}, true)[0];
      console.log(json);
      canvas.loadFromJSON(json.data);
    }
  }

  function configuracionPaginaController($mdDialog, orientacion, tipo) {
    var vm = this;
    vm.orientacion = orientacion;
    console.log(orientacion);

    vm.tipo = tipo;
    vm.tipos = [{id: 1, nombre: "A4 (21,0 cm x 29,7 cm)", height: 1122, width: 794}, {id: 2, nombre: "Carta (21,6 cm x 27,9 cm)", height: 1056, width: 816}];

    vm.hide = function () {
      $mdDialog.hide();
    };

    vm.cancel = function () {
      $mdDialog.cancel();
    };

    vm.answer = function () {
      let objTipo;
      for(let i = 0; i < vm.tipos.length; i++) {
        if (vm.tipos[i].id === vm.tipo) {
          objTipo = vm.tipos[i];
          
        }
      }
      let configuracion = {orientacion: vm.orientacion, tipo_id: objTipo.id, height: objTipo.height, width: objTipo.width};
      
      $mdDialog.hide(configuracion);
    };
  }

 
  function dialogoController($timeout, $q, $mdDialog,ProfesorService, $state,AgregarColaboradorService,documento,obtenerColaboradoresMaterialService,eliminarColaboradorMaterialService,PerfilService,AmigoService) {
    var vm = this;

    vm.profesores = {};
    vm.documento=documento;
    vm.colaboradores={};
    vm.usuario={};
    vm.amigosTemp={};
    vm.amigos=[];
    vm.customFullscreen = true;

    PerfilService.get().$promise.then(function (data) {
        console.log(data);
        vm.usuario = data; 
        //console.log(vm.perfil.profesores.url_foto_profesor);
    });

    AmigoService.query().$promise.then(function (data) {
      vm.amigosTemp = data;
      vm.amigosTemp = vm.amigosTemp.filter(vm.filtrarAmigos);
      console.log(vm.amigos);
    });


    obtenerColaboradoresMaterialService.get({id:vm.documento.id},function(data){
        vm.colaboradores=data;
        console.log(vm.colaboradores);
      });



    vm.actualizarColaboradores=function(){
      obtenerColaboradoresMaterialService.get({id:vm.documento.id},function(data){
        vm.colaboradores=data;
      });
    }

    //función para dejar solo los registros que tengan al usuario logeado
    vm.filtrarAmigos=function(amigo){
      if(amigo.id_estado_amistad == 1){

        if(amigo.amigo1.id_usuario == vm.usuario.id){
          ProfesorService.get({id: amigo.amigo2.id}).$promise.then(function (data) {
            var profesor=data;
            amigo.amigo2.email=profesor.usuario.email;
            vm.amigos.push(amigo.amigo2);
            return amigo.amigo2;
          });
          
        }else{
           ProfesorService.get({id: amigo.amigo1.id}).$promise.then(function (data) {
            var profesor=data;
            amigo.amigo1.email=profesor.usuario.email;
            vm.amigos.push(amigo.amigo1);
            return amigo.amigo1;
          });
        }
      }
      
    }

    vm.querySearch   = querySearch;

    function querySearch (query) {
      return query ? vm.amigos.filter( createFilterFor(query) ) : vm.amigos;
    }
    
    function createFilterFor(query) {

      var lowercaseQuery = query;
      //console.log(lowercaseQuery);

      return function filterFn(amigo) {
        //console.log(usuario.email);
        return (amigo.email.indexOf(lowercaseQuery) === 0);
      };
    }

    vm.agregarColaborador=function(idProfesor){
      console.log(vm.colaboradores);
      var colaborador = vm.colaboradores.filter(function(colaborador){
        return colaborador.id_profesor == idProfesor;
      });
      if(colaborador.length>0){
        alert('El colaborador existe');
      }else{
         var elemento={id_material:vm.documento.id,id_profesor:idProfesor};
        AgregarColaboradorService.save(elemento,function(data){
          console.log(data);
          vm.actualizarColaboradores();
        });
      }
     
    };

    vm.eliminarColaborador = function(idProfesor){
      var elemento={id_material:vm.documento.id,id_profesor:idProfesor};
      eliminarColaboradorMaterialService.delete(elemento,function(data){
        console.log(data);
        vm.actualizarColaboradores();
      });
    }

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