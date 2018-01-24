(function () {
	'use strict';

	angular
	.module('app')
	.service('ListartipomaterialService', listartipomaterialService);

	listartipomaterialService.$inject = ['$resource', 'API'];

	function listartipomaterialService($resource, API){
		return $resource(API + 'listartipomaterial');
	}
})();