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
    .state('profesor', {
      url: '/profesor',
      component: 'profesor',
      isPrivate: true
    })
    .state('editdocument', {
      url: '/editdocument',
      component: 'editdocument',
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
