(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('ListController', ListController);

  /** @ngInject */
  function ListController($log, $state, $stateParams, localStorageService) {
    var vm = this, type = $stateParams.type;

    vm.status = 0;

    switch(type) {
      case 'rightsApply':
        vm.title = '申请开店权/经销权';
        vm.tabsType = 'rightsApply';
        break;
      case 'accountApply':
        vm.title = '申请开户';
        vm.tabsType = 'apply';
        break;
      case 'groundingApply':
        vm.title = '申请店铺上架';
        vm.tabsType = 'apply';
        break;
      case 'user':
        vm.title = '用户信息报备';
        break;
      case 'invitation':
        vm.title = '邀约记录';
        vm.tabsType = 'invitation';
        break;
      case 'infoAudit':
        vm.title = '信息审核';
        vm.tabsType = 'audit';
        break;
      case 'rightsAudit':
        vm.title = '开店权/经销权审核';
        vm.tabsType = 'audit';
        break;
      case 'addrAudit':
        vm.title = '店铺地址审核';
        vm.tabsType = 'audit';
        break;
      case 'picAudit':
        vm.title = '店铺图片审核';
        vm.tabsType = 'audit';
        break;
    }


  }
})();
