angular
.module('app')
.config(routesConfig)
.run(middlewareConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('home');

  $stateProvider
  .state('login', {
    url: '/login',
    component: 'login',
    isPrivate: false
  })
  .state('landing', {
    url: '/home',
    component: 'landing',
    isPrivate: false
  })
  .state('dashboard', {
    url: '/dashboard',
    component: 'dashboard',
    isPrivate: true
  })
  .state('loginrecovery', {
    url: '/passrecovery/:token',
    component: 'loginrecovery',
    isPrivate: true
  })
  .state('documento', {
    url:'/documento',
    component:'documento',
    isPrivate: true
  })
  .state('administrator.profesor', {
    url: '/profesor',
    component: 'profesor',
    isPrivate: true
  })
  .state('restaurarProfesor', {
    url: '/restaurarprofesor',
    component: 'restaurarProfesor',
    isPrivate: true
  })
  .state('editdocument', {
    url: '/editdocument/:id',
    controller: 'EditarDocumento.controller',
    controllerAs: 'vm',
    templateUrl: 'app/components/editdocument/editdocument.component.html'
  })
  .state('obtenerMaterialProfesor', {
    url: '/obtenerMaterialProfesor',
    controller: 'MaterialesProfesor.controller',
    controllerAs: 'vm',
    templateUrl: 'app/components/editdocument/documentos.html'
  })
  .state('administrator.usuario', {
    url: '/usuario',
    component: 'usuario',
    isPrivate: true
  })
  .state('administrator.establecimiento', {
    url: '/establecimiento',
    component: 'establecimiento',
    isPrivate: true
  })
  .state('administrator.asignatura', {
    url: '/asignatura',
    component: 'asignatura',
    isPrivate: true
  })
  .state('material', {
    url: '/material',
    component: 'material',
    isPrivate: true
  })
  .state('administrator.material', {
    url: '/material',
    component: 'material',
    isPrivate: true
  })
  .state('dashboard.favoritos', {
    url: '/favoritos',
    component: 'favoritos',
    isPrivate: true
  })
  .state('administrator.elemento', {
    url: '/elemento',
    component: 'elemento',
    isPrivate: true
  })
  .state('objetivomineduc', {
    url: '/objetivomineduc',
    component: 'objetivomineduc',
    isPrivate: true
  })
  .state('listarusuarios', {
    url: '/listarusuarios',
    component: 'listarusuarios',
    isPrivate: true
  })
  .state('listarasignaturas', {
    url: '/listarasignaturas',
    component: 'listarasignaturas',
    isPrivate: true
  })
  .state('listarniveles', {
    url: '/listarniveles',
    component: 'listarniveles',
    isPrivate: true
  })
  .state('administrator', {
    url: '/administrator',
    component: 'administrator',
    isPrivate: true
  })
  .state('administrator.estadisticas', {
    url: '/estadisticas',
    component: 'estadisticas',
    isPrivate: true
  })
  /*
  .state('repositorio', {
    url: '/repositorio',
    component: 'repositorio',
    isPrivate: true    
  })
  */
  .state('etiqueta', {
    url: '/etiqueta',
    component: 'etiqueta',
    isPrivate: true
  })
  .state('dashboard.perfil', {
    url: '/perfil/:id',
    component: 'perfil',
    isPrivate: true
  })
  .state('dashboard.publicaciones', {
    url: '/publicaciones',
    component: 'publicaciones',
    isPrivate: true
  })
  .state('dashboard.materiales', {
    url: '/materiales',
    component: 'materiales',
    isPrivate: true
  })
  .state('dashboard.amigos', {
    url: '/amigos',
    component: 'amigos',
    isPrivate: true
  })
  .state('notificaciones', {
    url: '/notificaciones',
    component: 'notificacion',
    isPrivate: true
  })
  .state('profesores', {
    url: '/profesores',
    component: 'profesores',
    isPrivate: true
  });

  $httpProvider.interceptors.push('InterceptorApi');
}

function middlewareConfig($state, CredentialsService, $transitions) {
  // Funcion cada vez que se intenta acceder a una ruta
  $transitions.onStart({}, function (trans) {
    var isPrivate = trans.$to().isPrivate;
    var to = trans.$to().name;
    // Compruebo si esta logeado para acceder a rutas protegidas, si no esta logeado se va a la pestaña login
    if (isPrivate && !CredentialsService.isLogged()) {
      $state.go('landing');
    }

    // Compruebo que quiera entrar a el login cuando ya esta logeado
    if (to === 'login' && CredentialsService.isLogged()) {
      $state.go('dashboard.publicaciones');
    }

    if (to === 'landing' && CredentialsService.isLogged()) {
      $state.go('dashboard.publicaciones');
    }

    if (to === 'administrator' && CredentialsService.isLogged()) {
      $state.go('administrator.estadisticas');
    }

    if (to === 'dashboard' && CredentialsService.isLogged()) {
      $state.go('dashboard.publicaciones');
    }

  });
}
