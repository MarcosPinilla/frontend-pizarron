(function () {
	'use strict';

	angular
	.module('app')
	.service('ChatService', chatService);

	chatService.$inject = ['$resource', 'API'];

	function chatService($resource, API){
		return $resource(API + 'send', {
			get: {
				method: 'GET',
				isArray: true,
			}
		});
	}
})();