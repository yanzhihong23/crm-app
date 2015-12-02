(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('RightsPayController', RightsPayController);

  /** @ngInject */
  function RightsPayController($ionicActionSheet, $state, localStorageService) {
    var vm = this;

    vm.showPayModeAction = showPayModeAction;
    vm.showPayTypeAction = showPayTypeAction;
    vm.next = next;

    function showPayModeAction() {
      var payModeAction = $ionicActionSheet.show({
        buttons: [
         { text: '银行转账' },
         { text: '支付宝' },
         { text: '刷卡' },
         { text: '现金' }
        ],
        // destructiveText: 'Delete',
        titleText: '选择付款方式',
        cancelText: '取消',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
         return true;
        }
      });
    }

    function showPayTypeAction() {
      var payTypeAction = $ionicActionSheet.show({
        buttons: [
         { text: '全额' },
         { text: '定金' }
        ],
        // destructiveText: 'Delete',
        titleText: '选择付款类型',
        cancelText: '取消',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
         return true;
        }
      });
    }

    function next() {
      $state.go('rights:input');
    }
  }
})();
