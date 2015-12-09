(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('RightsInputController', RightsInputController);

  /** @ngInject */
  function RightsInputController($log, $state, localStorageService, RightsApplyService) {
    var vm = this;

    // vm.info = localStorageService.get('rightsApplyInfo');
    vm.info = RightsApplyService.info;

    $log.debug(vm.info);

    vm.next = next;

    function next() {
      localStorageService.set('rightsApplyInfo', vm.info);
      $state.go('rights:pay');
    }

  }
})();
