(function () {
	'use strict';

	angular
	.module('app')
	.service('GrupoService', grupoService);

	grupoService.$inject = ['$resource', 'API'];

	function grupoService($resource, API){
		return $resource(API + 'groups');
	}
})();