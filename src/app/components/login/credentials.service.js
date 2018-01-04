(function () {
  'use strict';

  angular
  .module('app')
  .service('CredentialsService', credentialsService);

  function credentialsService() {
    this.setToken = function (token) {
      localStorage.setItem('token', token);
    };

    this.getToken = function () {
      return localStorage.getItem('token');
    };

    this.setUser = function (user) {
      localStorage.setItem('user', user);
    };

    this.getUser = function () {
      return localStorage.getItem('user');
    };

    this.clearCredentials = function () {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    };

    this.isLogged = function () {
      if (this.getToken() && this.getUser()) {
        return true;
      }
      return false;
    };
  }
})();