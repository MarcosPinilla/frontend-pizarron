(function () {
  'use strict';

  angular
  .module('app')
  .component('elemento', {
    templateUrl: 'app/components/elemento/elemento.html',
    controller: elementoCtrl,
    controllerAs: 'vm'
  })
  .directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
  }]);

  elementoCtrl.$inject = ['ElementoService'];

  function elementoCtrl(ElementoService) {
    var vm = this;

    vm.elemento={
      descripcion_elemento: "el kratos",
      id_tipo_elemento: 1,
      nombre_archivo: "kratos xd"
    };
    vm.elementos={};

    ElementoService.query().$promise.then(function (data) {
      vm.elementos = data;
      console.log(vm.elementos);
    });

    vm.crear = function (){
      ElementoService.save(vm.elemento);
      ElementoService.query().$promise.then(function (data) {
      vm.elementos = data;
      console.log(vm.elementos);
    });
      //console.log("se guardo elemento" + vm.elemento);
    };


  }
})();