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
    this.setid = function (id) {
      localStorage.setItem('id', id);
    };

    this.getid = function () {
      return localStorage.getItem('id');
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

    this.setActive = function (active) {
      localStorage.setItem('active', active);
    };

    this.getActive = function () {
      return localStorage.getItem('active');
    };

    this.clearCredentials = function () {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('rol');
      localStorage.removeItem('active');
      localStorage.removeItem('id');
    };

    this.isLogged = function () {
      if (this.getToken() && this.getUser() && this.getRol() && this.getActive() && this.getid()) {
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

    this.isActive = function (){
      if(this.getActive() == 'true'){
        return true;
      }else{
        return false;
      }
    };

  }
})();