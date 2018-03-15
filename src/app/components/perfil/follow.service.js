(function () {
  'use strict';

  angular
  .module('app')
  .service('FollowService', followService);

  followService.$inject = ['$resource', 'API'];

  function followService ($resource, API) {
    return $resource(API + 'seguir', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
})();