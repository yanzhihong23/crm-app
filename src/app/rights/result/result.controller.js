(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('RightsResultController', RightsResultController);

  /** @ngInject */
  function RightsResultController($log, ApiService, $state, $stateParams, localStorageService, FormatService, RightsApplyService) {
    var vm = this, id = $stateParams.id;
    vm.id = id;

    vm.triggerApply = triggerApply;
    vm.finalPay = finalPay;
    vm.reApply = reApply;

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
  }
})();
