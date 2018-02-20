(function () {
	'use strict';

	angular
	.module('app')
	.service('SolicitudService', solicitudService);

	solicitudService.$inject = ['$resource', 'API'];

	function solicitudService($resource, API){
		return $resource(API + 'confirmarSolicitud');
	}
})();