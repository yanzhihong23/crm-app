(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('RightsPayController', RightsPayController);

  /** @ngInject */
  function RightsPayController($log, $ionicActionSheet, $state, localStorageService, ApiService, UserService, BankService, utils) {
    var vm = this,
        selfPays = [
          {text: '是', id: 1},
          {text: '否', id: 0}
        ],
        payModes = [
          { text: '银行转账', id: 0 },
          { text: '支付宝', id: 1 },
          { text: '刷卡', id: 2 },
          { text: '现金', id: 3 }
        ],
        payTypes = [
          { text: '全额', id: 1 },
          { text: '定金', id: 0 }
        ];

    vm.info = localStorageService.get('rightsApplyInfo');
    vm.info.selfPay = selfPays[0];
    vm.info.payMode = payModes[0];
    vm.info.payType = payTypes[0];
    vm.info.bank = BankService.selected;
    vm.showSelfPayAction = showSelfPayAction;
    vm.showPayModeAction = showPayModeAction;
    vm.showPayTypeAction = showPayTypeAction;
    vm.next = next;

    $log.debug(vm.info);

    function showSelfPayAction() {
      var selfPayAction = $ionicActionSheet.show({
        buttons: selfPays,
        // destructiveText: 'Delete',
        titleText: '选择是否本人支付',
        cancelText: '取消',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          vm.info.selfPay = selfPays[index];
          return true;
        }
      });
    }

    function showPayModeAction() {
      var payModeAction = $ionicActionSheet.show({
        buttons: payModes,
        // destructiveText: 'Delete',
        titleText: '选择付款方式',
        cancelText: '取消',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          vm.info.payMode = payModes[index];
          return true;
        }
      });
    }

    function showPayTypeAction() {
      var payTypeAction = $ionicActionSheet.show({
        buttons: payTypes,
        // destructiveText: 'Delete',
        titleText: '选择付款类型',
        cancelText: '取消',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          vm.info.payType = payTypes[index];
          return true;
        }
      });
    }

    function next() {
      $log.debug(vm.info);
      vm.info.date = moment().format('YYYY-MM-DD');
      localStorageService.set('rightsApplyInfo', vm.info);
      $state.go('rights:preview');
    }
  }
})();
