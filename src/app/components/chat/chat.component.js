(function () {
	'use strict';

	angular
  	.module('app')
  	.component('myChat', {
    	templateUrl: 'app/components/chat/chat.html',
    	controller: chatCtrl,
    	controllerAs: 'vm'
  	});


  	chatCtrl.$inject = ['$mdDialog','NotificacionesRecientesService', 'CredentialsService', 'AmigoService','PerfilService', 'MessageService', 'GrupoService', '$pusher'];

  	function chatCtrl($mdDialog, NotificacionesRecientesService, CredentialsService, AmigoService, PerfilService, MessageService, GrupoService, $pusher, $scope ) {

  		var vm = this;

      vm.notificaciones = {};
      vm.amigos = {};
      vm.visibleChat = true;
      vm.visibleChatGrupal = false;
      vm.mensajes = [];
      vm.idGrupo = 0;
      vm.chatCreado = false;
      vm.token = CredentialsService.getToken();
      console.log(vm.token);

      AmigoService.query().$promise.then(function (data) {
        vm.amigos = data;
      });


       PerfilService.get().$promise.then(function (data) {
           vm.usuarioID = data.id;
           console.log(data.id);
           console.log(vm.usuarioID);

            var client = new Pusher('28705022aa554d22c965', {
                  cluster: 'us2',
                  authEndpoint: 'http://localhost:8000/broadcasting/auth',
                   auth: {
                    headers: {
                      'Authorization': vm.token
                      // 'X-Requested-With': 'XMLHttpRequest',
                      // 'Content-Type' : 'application/json'
                      // 'X-CSRF-Token' : vm.token,
                      // 'Access-Control-Allow-Headers': 'X-CSRF-Token',
                    }},
                  key: '6af7dc41d3b9a2f104d8',
                  encrypted: true
                });

              var pusher = $pusher(client);
             
              var canal = pusher.subscribe('private-users.' + vm.usuarioID);
              // var canal = pusher.subscribe('chat');
               
                canal.bind('GroupCreated',
                function (data) {
                  console.log(data);
                  vm.datosGrupo = data;
                  console.log(vm.datosGrupo.group.id);
                  vm.chatCreado = true;
                  vm.idGrupo = data.group.id;


                  var client = new Pusher('28705022aa554d22c965', {
                          cluster: 'us2',
                          authEndpoint: 'http://localhost:8000/broadcasting/auth',
                           auth: {
                            headers: {
                              'Authorization': vm.token
                              // 'X-Requested-With': 'XMLHttpRequest',
                              // 'Content-Type' : 'application/json'
                              // 'X-CSRF-Token' : vm.token,
                              // 'Access-Control-Allow-Headers': 'X-CSRF-Token',
                            }},
                          key: '6af7dc41d3b9a2f104d8',
                          encrypted: true
                        });

                      var pusher = $pusher(client);

                      var canal2 = pusher.subscribe('private-groups.' + vm.datosGrupo.group.id);

                   
                        canal2.bind('NewMessage',
                        function (data) {
                          console.log(data);
                          if (data.usuario_id != vm.usuarioID) {
                              vm.mensajes.push(data.message);
                          }

                          console.log(vm.mensajes);


                        });

                });



         });



      //chat grupal

      vm.activarChatGrupal = function () {
        vm.visibleChat = false;
        vm.visibleChatGrupal = true;
      }

        

       vm.crearChatGrupal = function (id) {
        vm.visibleChat = true;
        vm.visibleChatGrupal = false;
        
        if (id > 0) {
          vm.grupo = {
            "name" : "nombre grupo",
            "usuario" : [id]
          }
        }else {
          vm.grupo = {
           "name" : "nombre grupo",
            "usuario" : ['1']
          }
        }
        console.log(id);
        

        vm.cerrarChat = function () {
          vm.chatCreado = false;
        }

      GrupoService.save(vm.grupo,function(data){

          console.log(vm.grupo);
          console.log(data);
          vm.idGrupo = data.id;


        },function(err){
          console.log(err);
        });


      }

     



// socket

      


        vm.chatEnv = function (message){

          vm.mensajes.push(message.message);
          message.group_id =  vm.idGrupo;
          console.log(message);
          MessageService.save(message, function (data) {
              console.log(data);
          }, function (error) {
            console.log(error);
          });
        };




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


    // socket 

      var client = new Pusher('28705022aa554d22c965', {
          cluster: 'us2',
          // authEndpoint: "http://example.com/pusher/auth",
          key: '6af7dc41d3b9a2f104d8',
          encrypted: true
        });

      var pusher = $pusher(client);

      var canal = pusher.subscribe('presence-chat');
      // var canal = pusher.subscribe('chat');
       
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