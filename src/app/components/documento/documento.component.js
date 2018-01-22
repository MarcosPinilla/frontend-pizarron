(function() {
	'use strict';
	angular
		.module('app')
		.component('documento', {
			templateUrl: 'app/components/documento/documento.component.html',
			controller: documentoCtrl,
			controllerAs: 'vm'
		});

	function documentoCtrl() {
		// Con vm = this, hacemos que se haga referencia al controlador por el 'this' y queda más comodo 
		// y unificado al mirar el html
		var vm = this;

		//PRUEBAS CON KONVAJS

		/*

		//Dimensiones del div 'container'
		var width = document.getElementById('container').clientWidth;
		var height = document.getElementById('container').clientHeight;

		//Stage del container
		var stage = new Konva.Stage({
			container: 'container',
			width: width,
			height: height
		});

		//Layer que se asignará a container
		var layer = new Konva.Layer();

		//Se agrega este layer al container
		stage.add(layer);

		//Se genera un layer temporal para añadir a esta capa
		var tempLayer = new Konva.Layer();
		stage.add(tempLayer);

		//Se crea un campo texto (para información)
		var text = new Konva.Text({
			fill : 'black'
		});
		//Se agrega a esta layer
		layer.add(text);

		//Se crean figuras al azar
		var star;
		for (var i = 0; i < 10; i++) {
			star = new Konva.Star({
				x : stage.width() * Math.random(),
				y : stage.height() * Math.random(),
				fill : "blue",
				numPoints :10,
				innerRadius : 20,
				outerRadius : 25,
				draggable: true,
				name : 'star ' + i,
				shadowOffsetX : 5,
				shadowOffsetY : 5
			});
			layer.add(star);
		}
		//Se dibujan en la capa
		layer.draw();


		//Dimensiones del panel de shapes
		var widthPanel = document.getElementById('panel').clientWidth;
		var heightPanel = document.getElementById('panel').clientHeight;

		//Stage del panel
		var panelStage = new Konva.Stage({
			container: 'panel',
			width: widthPanel,
			height: heightPanel
		})

		//Layer del panel
		var layerPanel = new Konva.Layer();
		
    	
		*/
	    //PRUEBAS CON FABRICJS

	    //Instancia del panel donde se seleccionarán los objetos
	    var panelcanvas = new fabric.Canvas('panelcanvas');

	    //Instancias del área de trabajo
	    var canvas = new fabric.Canvas('canvas');
	    vm.fontTest="";
	    vm.fontTest2=0;

	    vm.fonts = ["Lobster", "Shadows Into Light", "Dancing Script", "Source Code Pro"];
	    vm.fontsizes=[];
	    //Instancias de un objeto
        var cuadrado = new fabric.Rect({
            top : 100,
            left : 100,
            width : 60,
            height : 70,
            fill : 'red',
            hasControls: false
        });

        //Instancia de un objeto para escribir
        var textbox = new fabric.Textbox('Escribe aquí', {
		  left: 50,
		  top: 50,
		  width: 150,
		  fontSize: 20,
          hasControls: false
		});

        panelcanvas.add(cuadrado);
        panelcanvas.add(textbox);

	    for(var i=0;i<100;i++){
	    	vm.fontsizes.push(i);
	    }
        

	    vm.usarFont = function(font) {
	     //alert(font);
		  var myfont = new FontFaceObserver(font)
		  myfont.load()
		    .then(function() {
		      // when font is loaded, use it.
		      canvas.getActiveObject().set("fontFamily", font);
		      canvas.renderAll();
		    }).catch(function(e) {
		      console.log(e)
		      alert('font loading failed ' + font);
			});
		}
        
       	cuadrado.on('selected', function() {
			var rect = new fabric.Rect({
				top : 100,
	            left : 100,
	            width : 60,
	            height : 70,
	            fill : 'blue'
	        	});
        	canvas.add(rect).setActiveObject(rect);
		});

		vm.usarFontSize = function(fontsize) {
	    	canvas.getActiveObject().set("fontSize", fontsize);
 			canvas.renderAll();  
		} 

	    vm.generarFigura=function() {
			console.log("Hola");
				var rect = new fabric.Rect({
	            top : 100,
	            left : 100,
	            width : 60,
	            height : 70,
	            fill : 'blue'
	        	});

        	canvas.add(rect).setActiveObject(rect);
		};

		vm.generarTexto = function() {
			var texto = new fabric.Textbox('Escribe aquí', {
			  left: 50,
			  top: 50,
			  width: 150,
			  fontSize: 20
			});
			canvas.add(texto).setActiveObject(texto);
		}

		vm.eliminar = function() {
	    
	      	var activeGroup = canvas.getActiveGroup();
		    if (activeGroup) {
		        var activeObjects = activeGroup.getObjects();
		        for (let i in activeObjects) {
		            canvas.remove(activeObjects[i]);
		        }
		        canvas.discardActiveGroup();
		        canvas.renderAll();
		    } else canvas.getActiveObject().remove();
			    
		}


		var canvasWrapper = document.getElementById('todocanvas');
			canvasWrapper.tabIndex = 1000;
			canvasWrapper.addEventListener("keydown", function(e){
				 e = e || window.event;
   				 var key = e.which || e.keyCode;
				 if(key===46){
				 	vm.eliminar();
			    } else if(e.ctrlKey && key === 67) {
			    	vm.copiar();
			    } else if (e.ctrlKey && key === 86) {
			    	vm.pegar();
			    } else if (e.ctrlKey && key === 88) {
			    	vm.cortar();
			    }
			}, false);
		

		textbox.on('selected', function() {
			var texto = new fabric.Textbox('Escribe aquí', {
			  left: 50,
			  top: 50,
			  width: 150,
			  fontSize: 20
			});
			canvas.add(texto).setActiveObject(texto);
		});

		var json = panelcanvas.toJSON();
    	console.log(json);
    	var json = canvas.toJSON();
    	console.log(json);

    	//Subir imágen desde computador
		document.getElementById('archivo').addEventListener("change", function (e) {
		  var file = e.target.files[0];
		  var reader = new FileReader();
		  reader.onload = function (f) {
		    var data = f.target.result;                    
		    fabric.Image.fromURL(data, function (img) {
		      //var oImg = img.set({left: 0, top: 0, angle: 0,width:100, height:100}).scale(0.9);
		      canvas.add(img).renderAll();
		      var a = canvas.setActiveObject(img);
		      var dataURL = canvas.toDataURL({format: 'png', quality: 0.8});
		    });
		  };
		  reader.readAsDataURL(file);
		});


	    //Subir imágen desde URL (MUESTRA LA IMAGEN PERO NO ESTÁ CORRECTO)
	    vm.subir = function() {
	    	var URL = document.getElementById("url").value;
	    	console.log(URL);
	    	fabric.Image.fromURL(URL, function(imagen) {
				canvas.add(imagen).renderAll();
				var a = canvas.setActiveObject(imagen);
				var dataURL = canvas.toDataURL({format: 'png', quality: 0.8});
			})
		} 

		/* DEBERIA DESHABILITAR EL CORS PERO AUN ASI DA PROBLEMAS 
		vm.subir = function() {
			var URL = document.getElementById("url").value;
			fabric.util.loadImage(URL, function(img) {

			    var object = new fabric.Image(img);
			    canvas.add(object);
			    canvas.renderAll();
			    canvas.setActiveObject(object);    
			}, null, {crossOrigin: 'Anonymous'});
		}*/
	




































































































































































































































	//Lógica para copiar, pegar y cortar
	vm.copiar = function() {
		//Obtiene los objetos activos en ese momento y los almacena
		var grupo = canvas.getActiveGroup();
		var objeto = canvas.getActiveObject();

		if (grupo) {
			grupo.clone(function(copiado) {
				vm.clipboard = copiado;
			});
		} else if (objeto) {
			objeto.clone(function(copiado) {
				vm.clipboard = copiado;
			});	
		}
		
	}

	///FALTA HACER QUE SE DESUNAN
	vm.pegar = function() {
		// clone again, so you can do multiple copies.
		vm.clipboard.clone(function(copiadoObj) {
			canvas.discardActiveObject();
			copiadoObj.set({
				left: copiadoObj.left + 10,
				top: copiadoObj.top + 10,
				evented: true,
			});
			if (copiadoObj.type === 'activeSelection') {
				// active selection needs a reference to the canvas.
				copiadoObj.canvas = canvas;
				copiadoObj.forEachObject(function(obj) {
					canvas.add(obj);
				});
				// this should solve the unselectability
				copiadoObj.setCoords();
			} else {
				canvas.add(copiadoObj);
			}
			vm.clipboard.top += 10;
			vm.clipboard.left += 10;
			canvas.setActiveObject(copiadoObj);
			/*
			if(copiadoObj.length > 1) {
				var grupo = canvas.getActiveGroup();
				grupo.destroy();
			} */

			canvas.renderAll();
		});
	}
 	
	//MUCHOS DETALLES QUE ARREGLAR AQUI 	
	vm.cortar = function() {
		//Obtiene los objetos activos en ese momento y los almacena
		var grupo = canvas.getActiveGroup();
		var objeto = canvas.getActiveObject();

		if (grupo) {
			grupo.clone(function(cortar) {
				vm.clipboard = cortar;
			});
			grupo.forEachObject(function(o){ canvas.remove(o) });
      		canvas.discardActiveGroup().renderAll();
		} else if (objeto) {
			objeto.clone(function(cortar) {
				vm.clipboard = cortar;	
			});
			objeto.remove();
		}		
	}

	//Lógica para exportar a pdf, utilizando el elemento de canvas
	vm.exportar = function () {
    	html2canvas(document.getElementById('todocanvas'), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("test.pdf");
            }
    	});  
    };



	}

})();