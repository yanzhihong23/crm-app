(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('RightsResultController', RightsResultController);

  /** @ngInject */
  function RightsResultController($log, ApiService, $state, $stateParams, localStorageService, FormatService, RightsApplyService, utils) {
    var vm = this, id = $stateParams.id;
    vm.id = id;

    vm.triggerApply = triggerApply;
    vm.finalPay = finalPay;
    vm.reApply = reApply;
    vm.showPayAccount = showPayAccount;

    getDetail();

    function getDetail() {
      ApiService.rightsApplyDetail({id: id}).success(function(data) {
        if(data.flag === 1) {
          vm.info = FormatService.applyInfoFormat(data.data.result);

          localStorageService.set('rightsApplyPreview', vm.info);
        } else {
          $log.error('get rights apply detail error');
        }
      });
    }

    function triggerApply() {
      ApiService.triggerRightsApply({id: id}).success(function(data) {
        if(data.flag === 1) {
          vm.info.isTriggered = true;
        } else {
          $log.error('trigger rights apply error');
        }
      });
    }

    function finalPay() {
      $state.go('rights:pay', {id: id});
    }

    function reApply() {
      RightsApplyService.info.reApply = true;
      $state.go('rights:add');
    }

    function showPayAccount() {
      utils.alert({
        title: '缴款银行信息',
        content: '<div class="padding-vertical">开户银行：招商银行股份有限公司上海田林支行</div>' + 
        '<div class="padding-vertical">账户名称：上海立到网络科技有限公司</div>' + 
        '<div class="padding-vertical">银行账号：1219 1697 2510 902</div>',
        cssClass: 'text-left popup-lg'
      });
    }
  }
})();
