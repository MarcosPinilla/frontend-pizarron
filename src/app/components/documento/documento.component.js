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

	    //Instancia del panel donde se seleccionarán los objetos
	    var panelcanvas = new fabric.Canvas('panelcanvas');

	    //Instancias del área de trabajo
	    var canvas = new fabric.Canvas('canvas');

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
	}	
})();