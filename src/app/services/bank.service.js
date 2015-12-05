(function() {
  'use strict';

  angular
    .module('crmApp')
    .service('BankService', BankService);

  /** @ngInject */
  function BankService($state, utils, ApiService) {
    var vm = this;

    vm.selected = {};

    vm.select = select;

    getBankList();

    function select(index) {
      var bank = vm.bankList[index];
      vm.selected.name = bank.name;
      vm.selected.id = bank.id;
    }

    function getBankList() {
      ApiService.bankList().success(function(data) {
        if(data.flag === 1) {
          vm.bankList = data.data.result.map(function(obj) {
            return {
              name: obj.bankName,
              id: obj.bankMsgId
            };
          });
        }
      });
    }

  }
})();
