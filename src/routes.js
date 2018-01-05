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
    });

    $httpProvider.interceptors.push('InterceptorApi');
}

function middlewareConfig($state, CredentialsService, $transitions) {
  $transitions.onStart({}, function (trans) {
    console.log($state);
    var isPrivate =  trans.$to.isPrivate;
    var to = trans.$to().name;
    console.log("aqui voy");
    console.log(!CredentialsService.isLogged());
    console.log(isPrivate);

    if (isPrivate==1 && !CredentialsService.isLogged()) {
      $state.go('login');
      console.log(isPrivate);
    }

    if (to === 'login' && CredentialsService.isLogged()) {
      $state.go('dashboard');
      console.log("lo estoy");
      console.log(isPrivate);
    }
  })
}
