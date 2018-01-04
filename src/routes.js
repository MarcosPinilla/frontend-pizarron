angular
  .module('app')
  .config(routesConfig)
  .run(middlewareConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('login');

  $stateProvider
    .state('login', {
      url: '/login',
      component: 'login'
    })
    .state('landing', {
      url: '/home',
      component: 'landing',
    });

    $httpProvider.interceptors.push('InterceptorApi');


}

function middlewareConfig($state, CredentialsService, $transitions) {
  $transitions.onStart({}, function (trans) {
    var isPrivate =  trans.$to.isPrivate;
    var to = trans.$to().name;

    if (isPrivate && !CredentialsService.isLogged()) {
      $state.go('login');
    }

    if (to === 'login' && CredentialsService.isLogged()) {
      $state.go('administrator');
    }
  })
}
