(function () {
  'use strict';

  angular
  .module('app')
  .service('RecoveryCredentialsService', recoverycredentialsService);

  function recoverycredentialsService() {
    this.setTokenr = function (token) {
      localStorage.setItem('tokenr', token);
    };

    this.getTokenr = function () {
      return localStorage.getItem('tokenr');
    };

    this.setEmailr = function (email) {
      localStorage.setItem('emailr', email);
    };

    this.getEmailr = function () {
      return localStorage.getItem('emailr');
    };

    this.setPasswordr = function (token) {
      localStorage.setItem('passwordr', passwordr);
    };

    this.getPasswordr = function () {
      return localStorage.getItem('passwordr');
    };

    this.clearRecoveryCredentials = function () {
      localStorage.removeItem('tokenr');
      localStorage.removeItem('emailr');
      localStorage.removeItem('passwordr');
    };

    this.isLoggedr = function () {
      if (this.getTokenr() && this.getEmailr() && this.getPasswordr()) {
        return true;
      }
      return false;
    };
  }
})();