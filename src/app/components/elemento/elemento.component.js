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

  function elementoCtrl() {
    var vm = this;

    vm.elemento={};

    vm.crear = function (modelo){
      console.log(modelo);
    };


  }
})();