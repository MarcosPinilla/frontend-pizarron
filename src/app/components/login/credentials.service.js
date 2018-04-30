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

    this.setRol = function (rol) {
      localStorage.setItem('rol', rol);
    };

    this.getRol = function () {
      return localStorage.getItem('rol');
    };

    this.clearCredentials = function () {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('rol');
    };

    this.isLogged = function () {
      if (this.getToken() && this.getUser() && this.getRol()) {
        return true;
      }
      return false;
    };

    this.isAdmin = function () {
      if (1 == this.getRol()) {
        return true;
      }
      return false;
    };
  }
})();