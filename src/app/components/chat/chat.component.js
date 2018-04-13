(function () {
	'use strict';

	angular
  	.module('app')
  	.component('myChat', {
    	templateUrl: 'app/components/chat/chat.html',
    	controller: chatCtrl,
    	controllerAs: 'vm'
  	});

  	chatCtrl.$inject = ['$mdDialog','NotificacionesRecientesService', 'AmigoService', 'ChatService', '$pusher'];

  	function chatCtrl($mdDialog, NotificacionesRecientesService, AmigoService, ChatService) {
  		var vm = this;

      vm.notificaciones = {};
       vm.amigos = {};

      NotificacionesRecientesService.query().$promise.then(function (data) {
        console.log("NOTIFICACIONEEEEEEEEEEEEEEES!");
        console.log(data);
        vm.notificaciones = data;
      });

      AmigoService.query().$promise.then(function (data) {
        vm.amigos = data;
      });





      vm.showAdvanced = function(ev, amigo) {

        $mdDialog.show({
          controller: DialogController,
          controllerAs: 'vm',
          templateUrl: 'dialog1.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          locals: {
            amigo: amigo
          },
        })
        .then(function(answer) {
          vm.status = 'You said the information was "' + answer + '".';
        }, function() {
          vm.status = 'You cancelled the dialog.';
        });
      };
  	}



    function DialogController($scope, $mdDialog, amigo, ChatService, $pusher) {


    var vm = this;
    vm.amigo = amigo;
    vm.mensajes = [];
    console.log(vm.amigo);


    vm.chatEnv = function (message) {

      vm.mensajes.push(message.message);
      message.id = vm.amigo.amigo_2;
      console.log(message);
      ChatService.save(message, function (data) {
          console.log(data);
      }, function (error) {
        console.log(error);
      });
    };


        // socket al editar el documento 

      var client = new Pusher('28705022aa554d22c965', {
          cluster: 'us2',
          // authEndpoint: "http://example.com/pusher/auth",
          encrypted: true
        });

       var pusher = $pusher(client);

       // var canal = pusher.subscribe('private-chat');
      var canal = pusher.subscribe('chat');
       
        canal.bind('ChatEvent',
        function (data) {
          console.log(data);
          vm.mensajes.push(data.message);
          console.log(vm.mensajes);
        });

    vm.hide = function() {
      $mdDialog.hide();
    };

    vm.cancel = function() {
      $mdDialog.cancel();
    };

    vm.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
})();