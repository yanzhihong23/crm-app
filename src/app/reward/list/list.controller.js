(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('RewardListController', RewardListController);

  /** @ngInject */
  function RewardListController($log, $state, $stateParams, $scope, $rootScope, RewardApi, UserService) {
    var vm = this,
        type = +$stateParams.type,
        pageIndex, 
        itemsPerPage, 
        user = UserService.getUser(),
        userId = UserService.getUserId();

    vm.type = type;
    vm.status = 0;
    vm.doRefresh = init;
    vm.loadMore = load;

    $scope.$watch(function() {
      return vm.status;
    }, function(val, old) {
      init();
    });

    $rootScope.$on('update:reward:list', function() {
      init();
    });

    function init() {
      pageIndex = 1;
      itemsPerPage = 10;
      vm.items = [];
      vm.hasMoreData = false;
      load();
    }

    function load() {
      var params = {
        type: type,
        status: vm.status,
        userId: userId,
        pageIndex: pageIndex,
        itemsPerPage: itemsPerPage
      };

      if(user.roleId !== 7) {
        loadApproveList(params);
      } else {
        loadApplyList(params);
      }

      pageIndex++;
    }

    function loadApplyList(params) {
      RewardApi.applyList(params).success(onSucc).finally(onFinally);
    }

    function loadApproveList(params) {
      RewardApi.approveList(params).success(onSucc).finally(onFinally);
    }

    function onSucc(data) {
      if(data.flag === 1) {
        var result = data.data.applayAwardList;
        vm.hasMoreData = result.length === itemsPerPage;

        // data format
        result.forEach(function(obj) {
          var item = {
            storeName: obj.shopName,
            storeAddr: obj.shopAddr,
            date: obj.createdDate,
            id: obj.applayAwardId
          };

          vm.items.push(item);
        });
      }
    }

    function onFinally() {
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }
    
  }
})();
