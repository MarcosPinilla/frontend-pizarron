(function() {
	'use strict';
	angular
		.module('app')
		.component('documento', {
			templateUrl: 'app/components/documento/documento.component.html',
			controller: documentoCtrl,
			controllerAs: 'vm'
		});

	function documentoCtrl($scope) {
		// Con vm = this, hacemos que se haga referencia al controlador por el 'this' y queda más comodo 
		// y unificado al mirar el html
		var vm = this;

		
	    //PRUEBAS CON FABRICJS

	    var panelcanvas = new fabric.Canvas('panelcanvas');
	    var canvas = new fabric.Canvas('canvas');
	    vm.fontTest="";
	    vm.fontTest2=0;
	    vm.esTexto=true;
	    vm.mensaje="nada";
	    vm.cortar = false;
	    var _clipboard = null;
	    var ctrlDown=false;
	    vm.esGrupo=false;

	    vm.fonts = ["Lobster", "Shadows Into Light", "Dancing Script", "Source Code Pro"];
	    vm.fontsizes=[];

	    for(var i=0;i<100;i++){
	    	vm.fontsizes.push(i);
	    }

	    //Función para detectar click en canvas
	    
	   	canvas.on('object:selected', function(evt) {
			if(evt.target.get('type')==='textbox'){
				//vm.esTexto=false;

				$scope.$apply(function () {
					vm.esTexto=false;
					vm.fontTest2=evt.target.get('fontSize');
					vm.fontTest=evt.target.get('fontFamily');
				});	
					
			}else if (evt.target.get('type')==='rect'){
				//vm.esTexto=true;
				$scope.$apply(function () {
					vm.esTexto=true;
					vm.fontTest="";
		    		vm.fontTest2=0;
	    		});
			}	
		});

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

        	//canvas.add(rect).setActiveObject(rect);
			canvas.add(rect);
		};
		
		vm.generarTexto = function() {
			var texto = new fabric.Textbox('Escribe aquí', {
			  left: 50,
			  top: 50,
			  width: 150,
			  fontSize: 20,
			  fontFamily: 'Lobster',
			});

			canvas.add(texto)
			//canvas.add(texto).setActiveObject(texto);
			console.log(texto);
			//canvas.getActiveObject().set("fontFamily", 'Lobster');
			canvas.renderAll();
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
		    } else if(canvas.getActiveObject()){
		    	canvas.getActiveObject().remove();
		    }
			    
		}


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
				}
			}, false);


			vm.copy=function() {
			
				var activeGroup = canvas.getActiveGroup();
			    if (activeGroup) {
			        activeGroup.clone(function(cloned) {
					_clipboard = cloned;
					});
					vm.esGrupo=true;
			    } else if(canvas.getActiveObject()){
			    	canvas.getActiveObject().clone(function(cloned) {
					_clipboard = cloned;
				});
			    	vm.esGrupo=false;
			    }
			    vm.cortar = false;
			}

			vm.cut = function() {
			
				var activeGroup = canvas.getActiveGroup();
			    if (activeGroup) {
			        activeGroup.clone(function(cloned) {
						_clipboard = cloned;
					});
					activeGroup.forEachObject(function(o){ canvas.remove(o) });
					canvas.discardActiveGroup().renderAll();
					vm.esGrupo=true;
			    } else if(canvas.getActiveObject()){
			    	canvas.getActiveObject().clone(function(cloned) {
						_clipboard = cloned;
						canvas.getActiveObject().remove();
					});
			    	vm.esGrupo=false;
			    	
				}
				vm.cortar = true;
			    

				
			}

			vm.paste=function() {
				// clone again, so you can do multiple copies.
				if(vm.esGrupo){
					canvas.discardActiveGroup();
				}else{
					canvas.discardActiveObject();
				}
				_clipboard.clone(function(clonedObj) {
					canvas.discardActiveObject();
					clonedObj.set({
						left: clonedObj.left + 10,
						top: clonedObj.top + 10,
						evented: true,
					});
					console.log(vm.esGrupo)
					if (vm.esGrupo) {
						//clonedObj.canvas = canvas;
						 var arrayObj = clonedObj.getObjects();
					     for (let i in arrayObj) {
					     	canvas.add(arrayObj[i]);
				         }
						 //clonedObj.setCoords();
						 _clipboard.top += 10;
						_clipboard.left += 10;
						canvas.setActiveGroup(clonedObj);
						canvas.renderAll();
					} else {
						canvas.add(clonedObj);
						_clipboard.top += 10;
						_clipboard.left += 10;
						canvas.setActiveObject(clonedObj);
						canvas.renderAll();
					}
					
				});

				if(vm.cortar) {
					_clipboard = null;
				}
			}



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