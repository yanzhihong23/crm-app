(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('AccountListController', AccountListController);

  /** @ngInject */
  function AccountListController(ApiService, $state, localStorageService) {
    var vm = this;

    vm.type = 0;
  }
})();
