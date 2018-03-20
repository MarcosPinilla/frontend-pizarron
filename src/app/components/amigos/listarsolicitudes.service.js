(function () {
	'use strict';

	angular
	.module('app')
	.service('ListarSolicitudService', listarsolicitudService);

	listarsolicitudService.$inject = ['$resource', 'API'];

	function listarsolicitudService($resource, API){
		return $resource(API + 'obtenerSolicitudes');
	}
})();