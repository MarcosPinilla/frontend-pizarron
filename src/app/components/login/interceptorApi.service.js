(function () {
  'use strict';

  angular
  .module('app')
  .service('InterceptorApi', interceptorApi);

  interceptorApi.$inject = ['CredentialsService'];

  function interceptorApi(CredentialsService) {
    var service = this;
    service.request = function (config) {
      config.headers.Authorization = CredentialsService.getToken() || '';
      config.headers.Accept = 'application/json';
      return config;
    };
    service.responseError = function (response) {
      if (response.status === 401) {
        CredentialsService.clearCredentials();
      }
      return response;
    };
  }
})();
