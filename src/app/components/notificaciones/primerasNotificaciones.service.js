(function () {
    'use strict';

    angular
        .module('app')
        .service('PrimerasNotificacionesService', primerasnotificacionesService);

    primerasnotificacionesService.$inject = ['$resource', 'API'];

    function primerasnotificacionesService($resource, API) {
        return $resource(API + 'getPrimerasNotificaciones', {
            query: {
                method: 'GET',
                isArray: true
            }
        });
    }
})();
