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

		
	    //PRUEBAS CON FABRICJS

	    var panelcanvas = new fabric.Canvas('panelcanvas');
	    var canvas = new fabric.Canvas('canvas');
	    vm.fontTest="";
	    vm.fontTest2=0;
	    vm.esTexto=true;
	    vm.mensaje="nada";
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
				vm.esTexto=false;
				vm.fontTest2=evt.target.get('fontSize');
				vm.fontTest=evt.target.get('fontFamily');
				
			}else if (evt.target.get('type')==='rect'){
				//vm.esTexto=true;
				vm.esTexto=true;;
				vm.fontTest="";
	    		vm.fontTest2=0;

			}	
		});

		vm.cambiar = function(){
			vm.esTexto=!vm.esTexto;
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
			  fontSize: 20,
			  fontFamily: 'Lobster',
			});


			canvas.add(texto).setActiveObject(texto);
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
				 }else if(key===17){
				 	ctrlDown=true;
				 
			    }else if(ctrlDown && key === 67 ){
			    	vm.copy();
			    }else if(ctrlDown && key === 86 ){
			    	vm.paste();
			    }
			}, false)

			canvasWrapper.addEventListener("keyup",function(e){
				 e = e || window.event;
   				 var key = e.which || e.keyCode;
				if(key===17){
				 	ctrlDown=false;
			    }
			},false)


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
			}
			
		}

})();