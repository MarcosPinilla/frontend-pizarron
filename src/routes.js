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
  /*.state('pagoexitoso', {
    url: '/pagoexitoso',
    component: 'pagoexitoso',
    isPrivate: false,
    isPago: true
  })
  .state('pago', {
    url: '/pago',
    component: 'pago',
    isPrivate: false,
    isPago: true
  })*/
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
  .state('administrator.educadoras', {
    url: '/educadoras',
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
  .state('editplanificacion', {
    url: '/editplanificacion/:id',
    component: 'editplanificacion',
    isPrivate: true
  })
  .state('verorientacion', {
    url: '/verorientacion/:id',
    component: 'verorientacion',
    isPrivate: true
  })
  .state('vermaterial', {
    url: '/vermaterial/:id',
    component: 'vermaterial',
    isPrivate: true
  })
  .state('verplanificacion', {
    url: '/verplanificacion/:id',
    component: 'verplanificacion',
    isPrivate: true
  })
  .state('obtenerMaterialProfesor', {
    url: '/obtenerMaterialProfesor',
    controller: 'MaterialesProfesor.controller',
    controllerAs: 'vm',
    templateUrl: 'app/components/editdocument/documentos.html'
  })
  .state('obtenerNoticiasProfesor', {
    url: '/obtenerNoticiasProfesor',
    component: 'noticia',
    isPrivate: true
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
  .state('administrator.suscripcion', {
    url: '/suscripcion',
    component: 'suscripcion',
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
  .state('administrator.etiqueta', {
    url: '/etiqueta',
    component: 'etiqueta',
    isPrivate: true
  })
  .state('administrator.orientacion', {
    url: '/orientacion',
    component: 'orientacion',
    isPrivate: true
  })
  .state('administrator.materialanexo', {
    url: '/materialanexo',
    component: 'materialanexo',
    isPrivate: true
  })
  .state('administrator.actualizacionsemanal', {
    url: '/actualizaciones',
    component: 'actualizacionsemanal',
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
  .state('dashboard.orientaciones', {
    url: '/orientaciones',
    component: 'orientaciones',
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
  .state('dashboard.seguidores', {
    url: '/seguidores',
    component: 'seguidores',
    isPrivate: true
  })
  .state('dashboard.profesores', {
    url: '/profesores',
    component: 'profesores',
    isPrivate: true
  })
  .state('dashboard.mimaterial', {
    url: '/mimaterial',
    component: 'mimaterial',
    isPrivate: true  
  })
  .state('dashboard.miplanificacion', {
    url: '/miplanificacion',
    component: 'miplanificacion',
    isPrivate: true  
  })
  .state('dashboard.misnoticias', {
    url: '/misnoticias',
    component: 'noticia',
    isPrivate: true  
  })
  .state('dashboard.historialavisos', {
    url: '/historialavisos',
    component: 'historialavisos',
    isPrivate: true  
  })
  .state('dashboard.notificaciones', {
    url: '/notificaciones',
    component: 'notificacion',
    isPrivate: true
  })
  .state('dashboard.vistaactualizacion', {
    url: '/actualizacionsemanal',
    component: 'vistaactualizacion',
    isPrivate: true
  })
  .state('register', {
    url: '/register',
    component: 'register',
    isPrivate: false
  });

  $httpProvider.interceptors.push('InterceptorApi');
}

function middlewareConfig($state, CredentialsService, $transitions) {
  // Funcion cada vez que se intenta acceder a una ruta
  $transitions.onStart({}, function (trans) {
    var isPrivate = trans.$to().isPrivate;
    var isPago = trans.$to().isPago;
    var to = trans.$to().name;
    // Compruebo si esta logeado para acceder a rutas protegidas, si no esta logeado se va a la pestaña login
    if (isPrivate && !CredentialsService.isLogged()) {
      $state.go('login');
    }
    /* bloque comentado es el que verifica el pago
    if (isPrivate && CredentialsService.isLogged() && !CredentialsService.isActive()) {
      $state.go('pago');
    }
    */
    // Compruebo que quiera entrar a el login cuando ya esta logeado
    if (to === 'login' && CredentialsService.isLogged() ) {
      $state.go('dashboard.publicaciones');
    }

    if (to === 'landing' && CredentialsService.isLogged()) {
      $state.go('dashboard.publicaciones');
    }

    if (to === 'administrator' && CredentialsService.isLogged() && CredentialsService.isAdmin()) {
      $state.go('administrator.estadisticas');
    }

    if (to === 'administrator' && CredentialsService.isLogged() && !CredentialsService.isAdmin()) {
      $state.go('dashboard');
    }

    if (to === 'dashboard' && !CredentialsService.isLogged()) {
      $state.go('login');
    }

    if (to === 'dashboard.publicaciones' && !CredentialsService.isLogged()) {
      $state.go('login');
    }

    if (to === 'dashboard' && CredentialsService.isLogged()) {
      $state.go('dashboard.publicaciones');
    }

    

  });
}
