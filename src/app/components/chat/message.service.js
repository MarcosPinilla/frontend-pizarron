(function () {
	'use strict';

	angular
	.module('app')
	.service('MessageService', MessageService);

	MessageService.$inject = ['$resource', 'API'];

	function MessageService($resource, API){
		return $resource(API + 'conversations');
	}
})();