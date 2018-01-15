(function () {
  'use strict';

  angular
  .module('app')
  .service('SendService', sendService);

  sendService.$inject = ['$resource', 'API'];

  function sendService($resource, API) {
    return $resource(API + 'sendemail')
  }
})();