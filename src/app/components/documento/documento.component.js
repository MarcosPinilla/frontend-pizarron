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
		vm.mensaje = "Alonso";

		var width = document.getElementById('container').clientWidth;
		var height = document.getElementById('container').clientHeight;

		//dimensiones del panel de shapes
		var widthPanel = document.getElementById('panel').clientWidth;
		var heightPanel = document.getElementById('panel').clientHeight;

		var stage = new Konva.Stage({
			container: 'container',
			width: width,
			height: height
		});
		//stage del panel
		var panelStage = new Konva.Stage({
			container: 'panel',
			width: widthPanel,
			height: heightPanel
		})
		//layer del panel
		var layerPanel = new Konva.Layer();

		var layer = new Konva.Layer();

		stage.add(layer);
		
		//se agrega el layer al stage
		panelStage.add(layerPanel);

		//se obtiene la ubicacion de slots

		var starTest;
		
		
			starTest = new Konva.Star({
				x : panelStage.width() /2,
				y : panelStage.height()/2,
				fill : "blue",
				numPoints :10,
				innerRadius : 20,
				outerRadius : 25,
				name : 'star',
				shadowOffsetX : 5,
				shadowOffsetY : 5
			});
			layerPanel.add(starTest);
		
		layerPanel.draw();


		//_
		var tempLayer = new Konva.Layer();
		stage.add(tempLayer);

		var text = new Konva.Text({
			fill : 'black'
		});
		layer.add(text);

		var star;
		for (var i = 0; i < 4; i++) {
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
		layer.draw();

		stage.on("dragstart", function(e){
			e.target.moveTo(tempLayer);
			text.text('Moving ' + e.target.name());
			layer.draw();
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

		//EVento para panel izquierdo de shapes
		/*
		var previousPanelShape;
		panelStage.on("dragmove", function(evt){
			var pos = panelStage.getPointerPosition();
			var shape = layerPanel.getIntersection(pos);

			if(pos.x>=widthPanel+15){
				evt.target.moveTo(tempLayer);
				layer.draw();
				layerPanel.draw();
			}

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

*/

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
			tempLayer.draw();
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

		starTest.on('click', function() {
      

			var star;
		
		
			star = new Konva.Star({
				x : stage.width() /2,
				y : stage.height()/2,
				fill : "blue",
				numPoints :10,
				innerRadius : 20,
				outerRadius : 25,
				draggable: true,
				name : 'star',
				shadowOffsetX : 5,
				shadowOffsetY : 5
			});

			layer.add(star);
		
			layer.draw();
        
    	});

    	vm.export = function(){
        html2canvas(document.getElementById('container'), {
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
    }


		vm.pasarStage = function (){
			starTest.moveTo(layer);
        	layer.draw();
        	layerPanel.draw();
        	
		}


		vm.crearTextArea = function () {

			var textNode = new Konva.Text({
	            text: 'Some text here',
	            x: 50,
	            y: 50,
	            draggable:true,
	            fontSize: 20,
	            name:'textArea'
        	});

	        layer.add(textNode);
	        layer.draw();
        
		}
		

	

		stage.on('click',function (evt) {
           if(evt.target.name()=="textArea"){
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
	


        


	}


})();