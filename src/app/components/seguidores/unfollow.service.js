(function () {
    'use strict';
  
    angular
    .module('app')
    .service('UnfollowService', unfollowService);
  
    unfollowService.$inject = ['$resource', 'API'];
  
    function unfollowService ($resource, API) {
      return $resource(API + 'desseguir', {id: '@id'}, {
        update: {
          method: 'PUT'
        }
      });
    }
  })();