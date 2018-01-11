(function () {
  'use strict';

  angular
  .module('app')
  .service('InterceptorRecoveryApi', interceptorrecoveryApi);

  interceptorrecoveryApi.$inject = ['RecoveryCredentialsService'];

  function interceptorrecoveryApi(RecoveryCredentialsService) {
    var service = this;
    service.request = function (config) {
      config.headers.Accept = 'application/json';
      return config;
    };
    service.responseError = function (response) {
      if (response.status === 401) {
        RecoveryCredentialsService.clearCredentials();
      }
      return response;
    };
  }
})();
