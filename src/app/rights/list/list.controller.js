(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('RightsListController', RightsListController);

  /** @ngInject */
  function RightsListController(ApiService, $state, localStorageService) {
    var vm = this;

    vm.type = 0;
  }
})();
