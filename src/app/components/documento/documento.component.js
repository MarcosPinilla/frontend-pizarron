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
		
		//Se agrega el layer al stage del panel
		panelStage.add(layerPanel);

		//Se agrega una variable temporal para la capa
		var tempPanelLayer = new Konva.Layer();
		panelStage.add(tempPanelLayer);

		//Se genera un objeto en el panel
		var star;
			star = new Konva.Star({
				x : panelStage.width() /2,
				y : panelStage.height()/2,
				fill : "blue",
				numPoints :10,
				innerRadius : 20,
				outerRadius : 25,
				name : 'star',
				shadowOffsetX : 5,
				shadowOffsetY : 5,
				draggable: true
			});
			layerPanel.add(star);
			console.log(star);
		//layerPanel.draw();

			
		//Para mover las figuras dentro del contenedor
		stage.on("dragstart", function(e){
			e.target.moveTo(tempLayer);
			text.text('Moving ' + e.target.name());
			layer.draw();
		});

		var textNode = new Konva.Text({
            text: 'Nuevo texto',
            x: 50,
            y: 50,
            fontSize: 20,
            draggable: true,
            name: 'textArea'
        });

        layerPanel.add(textNode);
        layerPanel.draw();
		
		//Creación de un text área
		panelStage.on('dblclick', function(evt) {
			if (evt.target.name() === "textArea") {
            // create textarea over canvas with absolute position

            // first we need to find its positon
            var textPosition = evt.target.getAbsolutePosition();
            var stageBox = panelStage.getContainer().getBoundingClientRect();

            var areaPosition = {
                x: textPosition.x + stageBox.left,
                y: textPosition.y
            };


            // create textarea and style it
            var textarea = document.createElement('textarea');
            document.body.appendChild(textarea);

            textarea.value = evt.target.text();
            textarea.style.position = 'absolute';
            textarea.style.top = areaPosition.y + 'px';
            textarea.style.left = areaPosition.x + 'px';
            textarea.style.width = evt.target.width();

            textarea.focus();


            textarea.addEventListener('keydown', function (e) {
                // hide on enter
                if (e.keyCode === 13) {
                    evt.target.text(textarea.value);
                    layerPanel.draw();
                    document.body.removeChild(textarea);
                }
            });
        }
        });


		//Creación de un text área
		stage.on('dblclick', function(evt) {
			console.log(evt.currentTarget)
			if (evt.target.name() === "textArea") {
            // create textarea over canvas with absolute position

            // first we need to find its positon
            var textPosition = evt.target.getAbsolutePosition();
            var stageBox = stage.getContainer().getBoundingClientRect();

            var areaPosition = {
                x: textPosition.x + stageBox.left,
                y: textPosition.y
            };


            // create textarea and style it
            var textarea = document.createElement('textarea');
            document.body.appendChild(textarea);

            textarea.value = evt.target.text();
            textarea.style.position = 'absolute';
            textarea.style.top = areaPosition.y + 'px';
            textarea.style.left = areaPosition.x + 'px';
            textarea.style.width = evt.target.width();

            textarea.focus();


            textarea.addEventListener('keydown', function (e) {
                // hide on enter
                if (e.keyCode === 13) {
                    evt.target.text(textarea.value);
                    layer.draw();
                    document.body.removeChild(textarea);
                }
            });         
	        }
        });



		layer.on('click', function(evt) {
			console.log(evt.currentTarget);
			var json = evt.target.toJSON();

			console.log(json);
			if (evt.target) {
             console.log("hola")


            
        	}
        });




		var previousShape;
		stage.on("dragmove", function(evt){
			var pos = stage.getPointerPosition();
			var shape = layer.getIntersection(pos);
			if (previousShape && shape) {
				if (previousShape !== shape) {
                // leave from old targer
                previousShape.fire('dragleave', {
                	type : 'dragleave',
                	target : previousShape,
                	evt : evt.evt
                }, true);

                // enter new targer
                shape.fire('dragenter', {
                	type : 'dragenter',
                	target : shape,
                	evt : evt.evt
                }, true);
                previousShape = shape;
            } else {
            	previousShape.fire('dragover', {
            		type : 'dragover',
            		target : previousShape,
            		evt : evt.evt
            	}, true);
            }
        } else if (!previousShape && shape) {
        	previousShape = shape;
        	shape.fire('dragenter', {
        		type : 'dragenter',
        		target : shape,
        		evt : evt.evt
        	}, true);
        } else if (previousShape && !shape) {
        	previousShape.fire('dragleave', {
        		type : 'dragleave',
        		target : previousShape,
        		evt : evt.evt
        	}, true);
        	previousShape = undefined;
        }
    });
		stage.on("dragend", function(e){
			var pos = stage.getPointerPosition();
			var shape = layer.getIntersection(pos);
			if (shape) {
				previousShape.fire('drop', {
					type : 'drop',
					target : previousShape,
					evt : e.evt
				}, true);
			}
			previousShape = undefined;
			e.target.moveTo(layer);
			layer.draw();
			tempPanelLayer.draw();
		});

		stage.on("dragenter", function(e){
			e.target.fill('green');
			text.text('dragenter ' + e.target.name());
			layer.draw();
		});

		stage.on("dragleave", function(e){
			e.target.fill('blue');
			text.text('dragleave ' + e.target.name());
			layer.draw();
		});

		stage.on("dragover", function(e){
			text.text('dragover ' + e.target.name());
			layer.draw();
		});

		stage.on("drop", function(e){
			e.target.fill('red');
			text.text('drop ' + e.target.name());
			layer.draw();
		});


		//Para mover dentro del panel
		panelStage.on("dragstart", function(e){
			e.target.moveTo(tempPanelLayer);
			layerPanel.draw();
		});


		var previousStagePanel;
		panelStage.on("dragmove", function(evt){
			var pos = panelStage.getPointerPosition();
			var shape = layerPanel.getIntersection(pos);

			console.log(pos);
			console.log(shape);

			if (pos.x >= widthPanel + 15) {
				evt.target.moveTo(tempLayer);
				layer.draw();

				if(evt.target.name() === 'textArea') {
					var textNode = new Konva.Text({
			            text: 'Nuevo texto',
			            x: 50,
			            y: 50,
			            fontSize: 20,
			            draggable: true,
			            name: 'textArea'
			        });
			        layerPanel.add(textNode);
				} else if (evt.target.name() === 'star') {
					var star;
			
					star = new Konva.Star({
						x : panelStage.width() /2,
						y : panelStage.height()/2,
						fill : "blue",
						numPoints :10,
						innerRadius : 20,
						outerRadius : 25,
						name : 'star',
						shadowOffsetX : 5,
						shadowOffsetY : 5,
						draggable: true
					});
					layerPanel.add(star);	
				}
				
			
			layerPanel.draw();
			}
			if (previousStagePanel && shape) {
				if (previousStagePanel !== shape) {
                // leave from old targer
                previousStagePanel.fire('dragleave', {
                	type : 'dragleave',
                	target : previousStagePanel,
                	evt : evt.evt
                }, true);

                // enter new targer
                shape.fire('dragenter', {
                	type : 'dragenter',
                	target : shape,
                	evt : evt.evt
                }, true);
                previousStagePanel = shape;
            } else {
            	previousStagePanel.fire('dragover', {
            		type : 'dragover',
            		target : previousStagePanel,
            		evt : evt.evt
            	}, true);
            }
        } else if (!previousStagePanel && shape) {
        	previousStagePanel = shape;
        	shape.fire('dragenter', {
        		type : 'dragenter',
        		target : shape,
        		evt : evt.evt
        	}, true);
        } else if (previousStagePanel && !shape) {
        	previousStagePanel.fire('dragleave', {
        		type : 'dragleave',
        		target : previousStagePanel,
        		evt : evt.evt
        	}, true);
        	previousStagePanel = undefined;
        }
    });
		panelStage.on("dragend", function(e){
			var pos = panelStage.getPointerPosition();
			var shape = layerPanel.getIntersection(pos);
			if (shape) {
				previousStagePanel.fire('drop', {
					type : 'drop',
					target : previousStagePanel,
					evt : e.evt
				}, true);
			}
			previousStagePanel = undefined;
			e.target.moveTo(layerPanel);
			layerPanel.draw();
			tempLayer.draw();
		});
		
		var json = stage.toJSON();

    	console.log(json);

    	var json = panelStage.toJSON();

    	console.log(json);

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
		*/
	    //PRUEBAS CON FABRICJS

	    var panelcanvas = new fabric.Canvas('panelcanvas');
	    var canvas = new fabric.Canvas('canvas');
	    vm.fontTest="";
	    vm.fontTest2=0;

	    vm.fonts = ["Lobster", "Shadows Into Light", "Dancing Script", "Source Code Pro"];
	    vm.fontsizes=[];

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
			    }
			}, false);
		}	
})();