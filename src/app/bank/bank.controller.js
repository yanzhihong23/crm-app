(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('BankController', BankController);

  /** @ngInject */
  function BankController($state, $stateParams, BankService, utils) {
    var vm = this;

    vm.list = BankService.bankList;

    vm.select = select;

    function select(index) {
      BankService.select(index);
      utils.goBack();
    }

  }
})();
