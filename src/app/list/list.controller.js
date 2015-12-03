(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('ListController', ListController);

  /** @ngInject */
  function ListController($log, $state, $stateParams, ApiService) {
    var vm = this, type = $stateParams.type, addState, detailState;

    vm.status = 0;

    switch(type) {
      case 'rightsApply':
        vm.title = '申请开店权/经销权';
        vm.tabsType = 'rightsApply';
        vm.hasAdd = true;
        addState = 'rights:add';
        detailState = 'preview';

        vm.status = 1;
        break;
      case 'accountApply':
        vm.title = '申请开户';
        vm.tabsType = 'apply';
        vm.hasAdd = false;
        detailState = 'account:add';
        break;
      case 'groundingApply':
        vm.title = '申请开店';
        vm.tabsType = 'apply';
        vm.hasAdd = false;
        break;
      case 'client':
        vm.title = '用户信息报备';
        vm.tabsType = '';
        vm.hasAdd = true;
        addState = 'client:add';
        detailState = 'client:preview';
        break;
      case 'invitation':
        vm.title = '邀约记录';
        vm.tabsType = 'invitation';
        vm.hasAdd = true;
        addState = 'invitation';
        detailState = 'invitation';
        break;
      case 'infoAudit':
        vm.title = '信息审核';
        vm.tabsType = 'audit';
        vm.hasAdd = false;
        break;
      case 'rightsAudit':
        vm.title = '开店权/经销权审核';
        vm.tabsType = 'audit';
        vm.hasAdd = false;
        break;
      case 'addrAudit':
        vm.title = '店铺地址审核';
        vm.tabsType = 'audit';
        vm.hasAdd = false;
        break;
      case 'picAudit':
        vm.title = '店铺图片审核';
        vm.tabsType = 'audit';
        vm.hasAdd = false;
        break;
    }

    vm.add = add;
    vm.select = select;

    $scope.$watch(function() {
      return vm.status;
    }, function(val, old) {

    });

    function add() {
      $state.go(addState);
    }

    function select() {
      $state.go(detailState);
    }


  }
})();
