(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('RewardDetailController', RewardDetailController);

  /** @ngInject */
  function RewardDetailController($log, $state, $stateParams, $rootScope, RewardApi, moment, UserService, utils) {
    var vm = this,
        id = +$stateParams.id,
        type = +$stateParams.type,
        status = +$stateParams.status,
        user = UserService.getUser();

    vm.isAudit = user.roleId !== 7 && !status;
    
    if(user.roleId === 6) {
      vm.title = status ? '已审核' : '未审核';
    } else if(user.roleId === 4) {
      vm.title = status ? '已打款' : '未打款';
    } else {
      switch(status) {
        case 0:
          vm.title = '未申请';
          break;
        case 1:
          vm.title = '申请中';
          break;
        case 2:
          vm.title = '申请成功';
          break;
        case 3:
          vm.title = '申请失败';
          break;
      }
    }

    vm.apply = apply;
    vm.audit = audit;

    init();

    function init() {
      RewardApi.detail({id: id}).success(function(data) {
        if(data.flag === 1) {
          var info = data.data.applayAward;
          vm.info = {
            status: info.applyState,
            reward: {
              type: type ? '推广奖励' : '开店奖励',
              amount: info.awardMoney,
              to: info.agencyName
            },
            store: {
              id: info.shopId,
              name: info.shopName,
              addr: info.shopAddr,
              owner: info.shopkeeperName,
              date: moment(info.openTime).format('YYYY-MM-DD')
            },
            initial: {
              fee: info.receivable,
              feePaid: info.realityMoney,
              date: moment(info.payMoneyTime).format('YYYY-MM-DD'),
            },
            bank: {
              name: info.bankname,
              branch: info.bankSubbranch,
              accountName: info.bankAccountName,
              accountNo: info.bankNum
            }
          }
        }
      });
    }

    function apply() {
      $state.go('reward:apply', {type: type, id: id});
    }

    function audit(status) {
      utils.confirm({
        content: '请再次确认',
        onOk: function() {
          RewardApi.audit({
            id: id,
            userId: user.userId,
            status: status
          }).success(function(data) {
            if(data.flag === 1) {
              $rootScope.$broadcast('update:reward:list');
              utils.goBack();
            } else {
              utils.alert(data.msg);
            }
          });
        }
      });
    }
    
  }
})();
