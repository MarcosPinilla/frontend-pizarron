(function () {
	'use strict';

	angular
  	.module('app')
  	.component('mySidebar', {
    	templateUrl: 'app/components/sidebar/sidebar.html',
    	controller: sidebarCtrl,
    	controllerAs: 'vm'
  	});

  	sidebarCtrl.$inject = ['$mdDialog', '$pusher','$mdToast', 'PerfilService'];

  	function sidebarCtrl($mdDialog, $pusher ,$mdToast, PerfilService) {
  		var vm = this;


      vm.usuario = localStorage.getItem("user");
      vm.perfil = {};
      vm.nombre = null;

      vm.customFullscreen = true;
      
       PerfilService.get().$promise.then(function (data) {
          console.log(data);
          vm.perfil = data;
          vm.nombre = vm.perfil.nombres_profesor;
          vm.nombre = vm.nombre.split(" ");
          //console.log(vm.perfil.profesores.url_foto_profesor);
       });
//socket 
       var client = new Pusher('28705022aa554d22c965', {
          cluster: 'us2',
          // authEndpoint: "http://example.com/pusher/auth",
          encrypted: true
        });

       var pusher = $pusher(client);

       var canal = pusher.subscribe('notificacion');

       canal.bind('NotificacionesEvent',
        function (data) {
          console.log(data);
        });


       //comentario 

       var pusherComentario = $pusher(client);
       var canalComentario = pusherComentario.subscribe('comentario');

        canalComentario.bind('ComentarioEvent',
        function (data) {
          console.log(data);

              var pinTo = "bottom left";

            $mdToast.show(
              $mdToast.simple()
                .textContent(data.comentario)
                .position(pinTo)
                .hideDelay(3000)
            );
        });
  	}
})();