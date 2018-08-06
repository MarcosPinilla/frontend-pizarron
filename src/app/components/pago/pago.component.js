(function () {
	'use strict';

	angular
  	.module('app')
  	.component('pago', {
    	templateUrl: 'app/components/pago/pago.html',
    	controller: pagoCtrl,
    	controllerAs: 'vm'
  	});

  	pagoCtrl.$inject = ['ContratoService','API'];

  	function pagoCtrl(ContratoService, API) {
        var vm = this;

        vm.contrato={
            id_suscripcion : 1
        };

        vm.aPagar={}

        vm.pagar = function (){
            console.log("a pagar");
            ContratoService.get().$promise.then(function (data) {
                vm.aPagar = data;
                console.log(vm.aPagar);
            });
            /*ContratoService.save(vm.contrato, function (res) {
                console.log(res);
                vm.aPagar = res;
            }, function (err) {
                console.log("error");
                console.log(err);
            });*/
            
            window.location.href = API + 'contrato/'+ vm.aPagar.id +'/pagar';
        }  
  	}
})();