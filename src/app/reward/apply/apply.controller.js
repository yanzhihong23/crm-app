(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('RewardApplyController', RewardApplyController);

  /** @ngInject */
  function RewardApplyController($log, $state, $stateParams, $rootScope, RewardApi, BankService, UserService, utils) {
    var vm = this,
        id = $stateParams.id,
        type = $stateParams.type,
        userId = UserService.getUserId();

    vm.info = {
      id: id,
      type: type,
      bank: BankService.selected
    };

    // public methods
    vm.submit = submit;

    getBankInfo();

    function getBankInfo() {
      RewardApi.bankInfo({userId: userId}).success(function(data) {
        if(data.flag === 1) {
          var bank = data.data.applayAwardBank;
          vm.info.bank.name = bank.bankname;
          vm.info.bank.id = bank.bankcode;
          vm.info.bankBranch = bank.bankSubbranch;
          vm.info.accountName = bank.bankAccountName;
          vm.info.bankAccount = bank.bankNum;
        }
      });
    }

    function submit() {
      utils.confirm({
        content: '该申请只能进行一次，一旦提交不得撤回，请再次确认现在申请！',
        onOk: apply
      });
    }

    function apply() {
      RewardApi.apply(vm.info).success(function(data) {
        if(data.flag === 1) {
          utils.alert({
            title: '恭喜您',
            content: '申请提交成功，请耐心等待审核！',
            callback: function() {
              $rootScope.$broadcast('update:reward:list');
              utils.goBack(-2);
            }
          });
        } else {
          utils.alert({
            content: data.msg
          });
        }
      });
    }
  }
})();
