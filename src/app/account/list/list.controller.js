(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('AccountApplyListController', AccountApplyListController)
    .controller('AccountAuditListController', AccountAuditListController)

    function AccountApplyListController($log, $state, $scope, $rootScope, ApiService, UserService) {
      var vm = this, pageIndex, itemsPerPage, userId = UserService.getUserId();

      vm.status = -1;
      vm.doRefresh = init;
      vm.loadMore = load;
      vm.select = select;

      $scope.$watch(function() {
        return vm.status;
      }, function(val, old) {
        init();
      });

      $rootScope.$on('reload:list:account:apply', function() {
        init();
      });

      function select(id, detailId) {
        if(vm.status === -1) {
          $state.go('account:add', {id: id, detailId: detailId});
        } else {
          $state.go('account:preview', {id: id});
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
        if(vm.status === -1) {
          loadNotApplied();
        } else {
          loadApplied();
        }

        pageIndex++;
      }

      function loadNotApplied() {
        ApiService.accountApplyList({
          type: -1,
          userId: userId,
          pageIndex: pageIndex,
          itemsPerPage: itemsPerPage
        }).success(function(data) {
          if(data.flag === 1) {
            var result = data.data.data;
            if(result.length < itemsPerPage) {
              vm.hasMoreData = false;
            }

            // data format
            result.forEach(function(obj) {
              var item = {
                name: obj.applyName,
                phone: obj.phone,
                date: moment(obj.createdDate).format('YYYY-MM-DD'),
                id: obj.applyStoreId,
                detailId: obj.applyStoreDetailId
              };

              if(!vm.map[item.date]) {
                vm.map[item.date] = [];
              }

              vm.map[item.date].push(item);
            });
          }
        }).finally(function() {
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
      }

      function loadApplied() {
        ApiService.accountApplyList({
          type: vm.status,
          userId: userId,
          pageIndex: pageIndex,
          itemsPerPage: itemsPerPage
        }).success(function(data) {
          if(data.flag === 1) {
            var result = data.data.data;
            if(result.length < itemsPerPage) {
              vm.hasMoreData = false;
            }

            result.forEach(function(obj) {
              var item = {
                id: obj.storeId,
                name: obj.applyName,
                phone: obj.phone,
                date: moment(obj.applicationTime).format('YYYY-MM-DD')
              };

              if(!vm.map[item.date]) {
                vm.map[item.date] = [];
              }

              vm.map[item.date].push(item);
            });
          }
        }).finally(function() {
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
      }
    }

    function AccountAuditListController($log, $state, $scope, $rootScope, ApiService, UserService) {
      var vm = this, pageIndex, itemsPerPage, userId = UserService.getUserId();

      vm.status = 0;
      vm.doRefresh = init;
      vm.loadMore = load;
      vm.select = select;

      $scope.$watch(function() {
        return vm.status;
      }, function(val, old) {
        init();
      });

      $rootScope.$on('reload:list:account:audit', function() {
        init();
      });

      function select(id) {
        $state.go('account:preview', {id: id, type: 'audit'});
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
        ApiService.addrAuditList({
          type: vm.status,
          userId: userId,
          pageIndex: pageIndex,
          itemsPerPage: itemsPerPage
        }).success(function(data) {
          if(data.flag === 1) {
            var result = data.data.data;
            if(result.length < itemsPerPage) {
              vm.hasMoreData = false;
            }

            result.forEach(function(obj) {
              var item = {
                id: obj.storeId,
                name: obj.applyName,
                phone: obj.phone,
                date: moment(obj.applicationTime).format('YYYY-MM-DD')
              };

              if(!vm.map[item.date]) {
                vm.map[item.date] = [];
              }

              vm.map[item.date].push(item);
            });
          } else {
            vm.hasMoreData = false;
          }
        }).finally(function() {
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });

        pageIndex++;
      }
    }

    

})();