(function () {
	'use strict';

	angular
  	.module('app')
  	.component('orientaciones', {
    	templateUrl: 'app/components/orientaciones/orientaciones.html',
    	controller: orientacionesCtrl,
    	controllerAs: 'vm'
  	});

  	orientacionesCtrl.$inject = ['API'];

  	function orientacionesCtrl(API) {
        var vm = this;

  	}
})();