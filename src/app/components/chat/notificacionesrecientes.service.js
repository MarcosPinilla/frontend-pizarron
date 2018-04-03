(function () {
	'use strict';

	angular
	.module('app')
	.service('NotificacionesRecientesService', notificacionesrecientesService);

	notificacionesrecientesService.$inject = ['$resource', 'API'];

	function notificacionesrecientesService($resource, API){
		return $resource(API + 'getPrimerasNotificaciones');
	}
})();