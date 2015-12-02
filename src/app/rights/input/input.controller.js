(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('RightsInputController', RightsInputController);

  /** @ngInject */
  function RightsInputController($state) {
    var vm = this;

    vm.next = next;

    function next() {
      $state.go('rights:pay');
    }

  }
})();
