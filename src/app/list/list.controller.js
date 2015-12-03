(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('ListController', ListController)
    .controller('RightsApplyListController', RightsApplyListController)
    .controller('AccountApplyListController', AccountApplyListController)
    .controller('GroundingApplyListController', GroundingApplyListController);

  /** @ngInject */
  function ListController($log, $state, $stateParams, $scope, ApiService) {
    var vm = this, type = $stateParams.type, addState, detailState;

    vm.status = 0;

    switch(type) {
      case 'client':
        vm.title = '客户信息报备';
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

  function RightsApplyListController($log, $state, $scope, ApiService) {
    var vm = this;

    vm.status = 0;

    vm.select = select;

    $scope.$watch(function() {
      return vm.status;
    }, function(val, old) {

    });

    function select() {
      $state.go('preview');
    }
  }

  function AccountApplyListController($log, $state, $scope, ApiService) {
    var vm = this;

    vm.status = -1;

    vm.select = select;

    $scope.$watch(function() {
      return vm.status;
    }, function(val, old) {
      if(val === -1) { // rights success list

      } else {
        return false; // test only
        ApiService.accountApplyList({type: vm.status})
          .success(function(data) {
            if(data.flag === 1) {

            }
          });
      }
    });

    function select() {
      if(vm.status === -1) {
        $state.go('account:add');
      } else {
        $state.go('preview');
      }
    }
  }

  function GroundingApplyListController($log, $state, $scope, ApiService) {
    var vm = this;

    vm.status = 3;

    vm.select = select;

    $scope.$watch(function() {
      return vm.status;
    }, function(val, old) {
      return false; // test only
      ApiService.storeApplyList({type: vm.status})
        .success(function(data) {
          if(data.flag === 1) {

          }
        });
    });

    function select() {
      if(vm.status === 3) {
        $state.go('pic:upload');
      } else {
        $state.go('result');
      }
    }
  }
})();
