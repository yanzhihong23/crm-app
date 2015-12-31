(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('RightsApplyListController', RightsApplyListController)
    .controller('RightsAuditListController', RightsAuditListController);

  /** @ngInject */
  function RightsApplyListController($log, $state, $scope, $rootScope, ApiService, UserService, RightsApplyService) {
    var vm = this, pageIndex, itemsPerPage, userId = UserService.getUserId();

    vm.canAdd = UserService.getUser().roleId === 7;
    vm.status = 0;
    vm.doRefresh = init;
    vm.loadMore = load;

    $scope.$watch(function() {
      return vm.status;
    }, function(val, old) {
      init();
    });

    $rootScope.$on('reload:list:apply:rights', function() {
      $log.debug('reload:list:apply:rights');
      init();
    });
    
    function init() {
      $log.debug('init');
      pageIndex = 1;
      itemsPerPage = 10;
      vm.map = {};
      vm.hasMoreData = true;
      load();

      RightsApplyService.reset();
    }

    function load() {
      $log.debug('load');
      ApiService.rightsApplyList({
        type: vm.status,
        userId: userId,
        pageIndex: pageIndex,
        itemsPerPage: itemsPerPage
      }).success(function(data) {
        if(data.flag === 1) {
          var result = data.data.result;
          if(result.length < itemsPerPage) {
            vm.hasMoreData = false;
          }

          // data format
          result.forEach(function(obj) {
            var item = {
              name: obj.applyName,
              phone: obj.phone,
              applyType: obj.applyType,
              paymentType: obj.paymoneyType,
              date: obj.createdDate,
              id: obj.applyStoreId
            };

            if(!vm.map[obj.createdDate]) {
              vm.map[obj.createdDate] = [];
            }

            vm.map[obj.createdDate].push(item);
          });
        }
      }).finally(function() {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });

      pageIndex++;
    }
  }

  function RightsAuditListController($rootScope, $log, $state, $scope, ApiService, UserService) {
    var vm = this, pageIndex, itemsPerPage, user = UserService.getUser();

    vm.status = 0;
    vm.doRefresh = init;
    vm.loadMore = load;
    vm.select = select;

    $scope.$watch(function() {
      return vm.status;
    }, function(val, old) {
      init();
    });

    $rootScope.$on('reload:list:audit:rights', function() {
      init();
    });

    function select(id) {
      if(vm.status === 0) {
        $state.go('rights:preview', {id: id, type: 'audit'});
      } else {
        $state.go('rights:preview', {id: id, type: 'audited'});
      }
    }

    function init() {
      $log.debug('init');
      pageIndex = 1;
      itemsPerPage = 10;
      vm.map = {};
      vm.hasMoreData = true;
      load();
    }

    function load() {
      $log.debug('load');
      ApiService.rightsAuditList({
        status: vm.status,
        roleId: user.roleId,
        userId: user.userId,
        pageIndex: pageIndex,
        itemsPerPage: itemsPerPage
      }).success(function(data) {
        if(data.flag === 1) {
          var result = data.data.result;
          if(result.length < itemsPerPage) {
            vm.hasMoreData = false;
          }

          // data format
          result.forEach(function(obj) {
            var item = {
              name: obj.applyName,
              phone: obj.phone,
              applyType: obj.applyType,
              paymentType: obj.paymoneyType,
              date: obj.createdDate,
              id: obj.applyStoreId || obj.applyId
            };

            if(!vm.map[obj.createdDate]) {
              vm.map[obj.createdDate] = [];
            }

            vm.map[obj.createdDate].push(item);
          });
        }
      }).finally(function() {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });

      pageIndex++;
    }
  }
  
})();
