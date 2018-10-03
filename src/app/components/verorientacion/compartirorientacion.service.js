(function () {
	'use strict';

	angular
	.module('app')
	.service('CompartirOrientacionService', compartirOrientacionService);

	compartirOrientacionService.$inject = ['$resource', 'API'];

	function compartirOrientacionService($resource, API){
		return $resource(API + 'compartirorientacion', {
      	save: {
        	method: 'POST'
        }
    });
  }
})();