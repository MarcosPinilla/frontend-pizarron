angular
  .module('app', ['ui.router', 'ngMaterial', 'ngResource'])
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('app')
      .primaryPalette('green')
      .accentPalette('lime')
      .warnPalette('red');
  })
  .constant('API', 'http://localhost:8000/api/');
