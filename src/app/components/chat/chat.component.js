(function () {
	'use strict';

	angular
 .module('app')
 .component('myChat', {
   templateUrl: 'app/components/chat/chat.html',
   controller: chatCtrl,
   controllerAs: 'vm'
 });


 chatCtrl.$inject = ['$mdDialog', 'ListarNoticiasService', 'NoticiaService', 'NotificacionesRecientesService', 'CredentialsService', 'AmigoService','PerfilService', 'MessageService', 'GrupoService','$state', '$pusher'];

 function chatCtrl($mdDialog, ListarNoticiasService, NoticiaService, NotificacionesRecientesService, CredentialsService, AmigoService, PerfilService, MessageService, GrupoService,$state, $pusher, $scope) {

     var vm = this;
 
   vm.notificaciones = {};
   vm.amigos =[];
   vm.visibleChat = true;
   vm.visibleChatGrupal = false;
   vm.mensajes = [];
   vm.idGrupo = 0;
   vm.selected = [];
   vm.token = CredentialsService.getToken();
   vm.chats = [];
   vm.noticias = [];
   vm.usuarioID = 0;
   vm.inputVacio = '';
   vm.keypress = 0;
   vm.nuevo = false;
   vm.textBuscar ='';

  ListarNoticiasService.query().$promise.then(function(data){
    vm.noticias=data;
  });

   vm.nuevaNoticia = function(ev) {
      $mdDialog.show({
        controller: dialogoController,
        controllerAs: 'vm',
        templateUrl: 'app/components/chat/nuevaNoticia.dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: vm.customFullscreen, // Only for -xs, -sm breakpoints.
        locals: {
        },
      })
      .then(function (answer) {
         ListarNoticiasService.query().$promise.then(function(data){
          vm.noticias=data;
          $state.reload();
        });
        vm.status = 'Documento:  ' + answer + '.';
      }, function () {
        vm.status = 'CANCELADO';
      });
    };

    vm.historialAvisos = function(){
      $state.go("dashboard.historialavisos");
    }

  PerfilService.get().$promise.then(function (data) {
    vm.usuarioID = data.id; 

      AmigoService.query().$promise.then(function (data) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].amigo_1 != vm.usuarioID) {
              vm.amigos.push(data[i].amigo1);
            }else {
              vm.amigos.push(data[i].amigo2);
            }
          }

    });

     
   });

  // vm.buscarAmigos = function(valor) {
  //   console.log(valor);
  //   var amigos = [];
  //   for (var i = 0; i < vm.amigos.length; i++) {
  //     if (!vm.amigos[i].nombres_profesor.indexOf(valor)) {
  //       console.log(valor, vm.amigos[i].nombres_profesor)
  //       amigos.push(vm.amigos[i]);
  //     }
  //   }
  //   console.log(amigos);
    
  //   if (amigos.length > 0) {
  //     vm.amigos = amigos;
  //   }

  // }



 

  vm.toggle = function (item) {
    vm.selected.push(item.id);
  };


   PerfilService.get().$promise.then(function (data) {
    vm.usuarioID = data.id;
 
    var client = new Pusher('8cf3e9d7177ccf05dfc7', {
     cluster: 'us2',
     authEndpoint: 'https://sistema.educadoras.cl/v1/broadcasting/auth',
      //authEndpoint: 'http://localhost:8000/broadcasting/auth',
     auth: {
       headers: {
         'Authorization': vm.token
                       // 'X-Requested-With': 'XMLHttpRequest',
                       // 'Content-Type' : 'application/json'
                       // 'X-CSRF-Token' : vm.token,
                       // 'Access-Control-Allow-Headers': 'X-CSRF-Token',
                     }},
                     key: 'd1bb6663ea1a94de9df7',
                     encrypted: true
                   });
 
    var pusher = $pusher(client);
 
    var canal = pusher.subscribe('private-users.' + vm.usuarioID);
               // var canal = pusher.subscribe('chat');
 
               canal.bind('GroupCreated',
                 function (data) {
                   vm.datosGrupo = data;
                   vm.idGrupo = data.group.id;
                   data.chatCerrado = true;
                   data.chatMinimizado = false;
                     for (var i = 0; i < data.users.length; i++) {
                       if (vm.usuarioID != data.users[i].id) {
                         data.nombreChat = data.users[i].nombres_profesor;
                       }
                     }


                  var esta = false;
                    if (vm.chats.length == 0) {
                       vm.chats.push(data);
                     }else{
                       for (var i = 0; i < vm.chats.length; i++) { 
                         if (vm.chats[i].group.id == data.group.id) {
                           esta = true;
                         }
                       }

                       if (!esta) {
                          vm.chats.push(data);
                       }
                     }

                   vm.nuevo = true;
 
                   var client = new Pusher('8cf3e9d7177ccf05dfc7', {
                     cluster: 'us2',
                     authEndpoint: 'https://sistema.educadoras.cl/v1/broadcasting/auth',
                     //authEndpoint: 'http://localhost:8000/broadcasting/auth',
                     auth: {
                       headers: {
                         'Authorization': vm.token
                               // 'X-Requested-With': 'XMLHttpRequest',
                               // 'Content-Type' : 'application/json'
                               // 'X-CSRF-Token' : vm.token,
                               // 'Access-Control-Allow-Headers': 'X-CSRF-Token',
                             }},
                             key: 'd1bb6663ea1a94de9df7',
                             encrypted: true
                           });
 
                   var pusher = $pusher(client);
 
                   var canal2 = pusher.subscribe('private-groups.' + vm.datosGrupo.group.id);
 
 
                   canal2.bind('NewMessage',
                     function (data) {
                       // if (data.usuario_id != vm.usuarioID) {
                       //   vm.mensajes.push(data.message);
                       //     vm.chats[data.index].conversations = data.grupo;
                       // }
 
                       // console.log(vm.mensajes);
                       vm.chats[data.index].conversations = data.grupo;
                      $("#bottom").animate({ scrollTop: $('#bottom')[0].scrollHeight}, 1000);
 
                     });
 
                 });
 
             });
 
 
 
       //chat grupal
 
       vm.activarChatGrupal = function () {
         vm.visibleChat = false;
         vm.visibleChatGrupal = true;
       }
 
      vm.cancelarChatGrupal = function () {
        vm.visibleChatGrupal = false;
        vm.visibleChat = true;
      }
 
       vm.crearChatGrupal = function (id) {
         vm.visibleChat = true;
         vm.visibleChatGrupal = false;
         
         if (id > 0) {
           vm.grupo = {
             "name" : "individual",
             "usuario" : [id]
           }
         }else {
           vm.grupo = { 
             "name" : "grupo",
            "usuario" : vm.selected
          }
          console.log(vm.grupo); 
        }
        console.log(id);
 
 
       GrupoService.save(vm.grupo,function(data){
 
         console.log(vm.grupo);
         console.log(data);
         vm.idGrupo = data.id;
         vm.selected = [];
         //$("#bottom").animate({ scrollTop: $('#bottom')[0].scrollHeight}, 1000);
 
       },function(err){
         console.log(err);
       });
 
        
     }
 
        vm.cerrarChat = function (id) {
         console.log(id);
         console.log(vm.chats.length);
         for (var i = 0; i < vm.chats.length ; i++) {
           if (vm.chats[i].group.id == id) {
             console.log(vm.chats[i].chatCerrado);
             vm.chats[i].chatCerrado = false;
             vm.chats.splice(i, 1);
           }
         }
       }
 
 



// socket



vm.chatEnv = function (message, index){
 var mensajeEvn = {};
  console.log(message);
    vm.mensajes.push(message);
   mensajeEvn.message = message;
   mensajeEvn.group_id =  vm.idGrupo;
   mensajeEvn.inde = index;
   console.log(mensajeEvn);
  console.log(index);
  vm.chats[index] = "";
  MessageService.save(mensajeEvn, function (data) {
  
    // console.log(data);
    // console.log(vm.chats[index].conversations);
    // vm.chats[index].conversations = data.conversations;
    // console.log(vm.chats[index].conversations);
  }, function (error) {
    console.log(error);
  });
};

//socket noticia

var client = new Pusher('8cf3e9d7177ccf05dfc7', {
        cluster: 'us2',
                key: '8cf3e9d7177ccf05dfc7',
                encrypted: true
              });

                 var pusher = $pusher(client);

          var canal3 = pusher.subscribe('noticia');


            canal3.bind('NoticiaEvent',
              function (data) {
                console.log(data);
               
                vm.noticias=data.noticias;

              });


}

angular.module('app').directive("scrollBottom", function(){
    return {
        link: function(scope, element, attr){
            var $id= $("#" + attr.scrollBottom);
            $(element).on("click", function(){
                $id.scrollTop($id[0].scrollHeight);
            });
        }
    }
  });

function dialogoController($mdDialog, NoticiaService) {

    var vm = this;
    
    vm.noticia={};

    /*console.log(vm.usuario);
    console.log(vm.asignaturas);
    console.log(vm.niveles);
    console.log(vm.tipo_materiales);*/

    vm.crearNoticia = function () {
      console.log('entra a la funcion');
      if(vm.noticia.titulo != null && vm.noticia.contenido != null) {
        NoticiaService.save(vm.noticia);
        $mdDialog.hide();
         ListarNoticiasService.query().$promise.then(function(data){
          vm.noticias=data;
          //$state.reload();
        });
      }
    };     

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

