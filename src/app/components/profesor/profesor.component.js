(function () {
  'use strict';

  angular
  .module('app')
  .component('profesor', {
    templateUrl: 'app/components/profesor/profesor.html',
    controller: profesorCtrl,
    controllerAs: 'vm'
  });

  profesorCtrl.$inject = ['$mdDialog']

  function profesorCtrl($mdDialog) {
    var vm = this;

    vm.people = [
      { name: 'Jorge Hoschtetter', img: 'img/100-0.jpeg', newMessage: true },
      { name: 'Roberto Espinosa', img: 'img/100-1.jpeg', newMessage: false },
      { name: 'Adrian Herrera', img: 'img/100-2.jpeg', newMessage: false }
    ];
    vm.goToPerson = function(person, event) {
      $mdDialog.show(
        $mdDialog.alert()
        .title('Navigating person')
        .textContent('Inspect ' + person)
        .ariaLabel('Person inspect demo')
        .ok('Neat!')
        .targetEvent(event)
      );
    };
  }
})();
