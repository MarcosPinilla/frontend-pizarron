angular
  .module('app', ['ui.router', 'ngMaterial', 'ngResource'])
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('app')
      .primaryPalette('green')
      .accentPalette('lime')
      .warnPalette('red');
    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark().primaryPalette('grey');
    $mdThemingProvider.theme('dark-green').backgroundPalette('green').dark().primaryPalette('green');
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark().primaryPalette('orange');
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark().primaryPalette('deep-purple');
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark().primaryPalette('blue');
  })
  .constant('API', 'http://10.10.10.84:8000/api/');
