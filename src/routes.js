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
    .state('profesor', {
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
      templateUrl: 'app/components/editdocument/editdocument.html'
    })
    .state('obtenerMaterialProfesor', {
      url: '/obtenerMaterialProfesor',
      controller: 'MaterialesProfesor.controller',
      controllerAs: 'vm',
      templateUrl: 'app/components/editdocument/documentos.html'
    })
    .state('usuario', {
      url: '/usuario',
      component: 'usuario',
      isPrivate: true
    })
    .state('establecimiento', {
      url: '/establecimiento',
      component: 'establecimiento',
      isPrivate: true
    })
    .state('asignatura', {
      url: '/asignatura',
      component: 'asignatura',
      isPrivate: true
    })
    .state('material', {
      url: '/material',
      component: 'material',
      isPrivate: true
    })
    .state('elemento', {
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
    .state('repositorio', {
      url: '/repositorio',
      component: 'repositorio',
      isPrivate: true    
    })
    .state('etiqueta', {
      url: '/etiqueta',
      component: 'etiqueta',
      isPrivate: true
    })
    .state('perfil', {
      url: '/perfil',
      component: 'perfil',
      isPrivate: true
    });
  $httpProvider.interceptors.push('InterceptorApi');
}

function middlewareConfig($state, CredentialsService, $transitions) {
  $transitions.onStart({}, function (trans) {
    var isPrivate = trans.$to.isPrivate;

    var to = trans.$to().name;
    if (isPrivate && !CredentialsService.isLogged()) {
      $state.go('login');
    }

    if (to === 'login' && CredentialsService.isLogged()) {
      $state.go('dashboard');
    }
  });
}
