(function () {
	'use strict';

	angular
	.module('app')
	.service('CompartirmaterialService', compartirmaterialService);

	compartirmaterialService.$inject = ['$resource', 'API'];

	function compartirmaterialService($resource, API){
		return $resource(API + 'compartirMaterial');
	}
})();