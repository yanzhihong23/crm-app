(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('GroundingApplyListController', GroundingApplyListController)
    .controller('GroundingAuditListController', GroundingAuditListController);

    function GroundingApplyListController($log, $state, $scope, $rootScope, ApiService, UserService) {
      var vm = this, pageIndex, itemsPerPage, userId = UserService.getUserId();

      vm.status = 3;
      vm.doRefresh = init;
      vm.loadMore = load;
      vm.select = select;

      $scope.$watch(function() {
        return vm.status;
      }, function(val, old) {
        init();
      });

      $rootScope.$on('reload:list:grounding:apply', function() {
        init();
      });

      function select(id) {
        if(vm.status === 3) {
          $state.go('grounding:upload', {id: id});
        } else {
          $state.go('grounding:preview', {id: id});
        }
      }


      function init() {
        $log.debug('init');
        pageIndex = 1;
        itemsPerPage = 10;
        vm.map = {};
        vm.hasMoreData = false; // TODO
        load();
      }

      function load() {
        ApiService.storeApplyList({
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

            // data format
            result.forEach(function(obj) {
              var item = {
                id: obj.storeId,
                name: obj.applyName,
                phone: obj.phone,
                date: moment(obj.addressApprovalTime).format('YYYY-MM-DD')
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

        pageIndex++;
      }

      $log.debug('GroundingApplyListController end');
    }

    function GroundingAuditListController($log, $state, $scope, $rootScope, ApiService, UserService) {
      var vm = this, pageIndex, itemsPerPage, userId = UserService.getUserId();

      vm.status = 2;
      vm.doRefresh = init;
      vm.loadMore = load;
      vm.select = select;

      $scope.$watch(function() {
        return vm.status;
      }, function(val, old) {
        init();
      });

      $rootScope.$on('reload:list:grounding:audit', function() {
        init();
      });

      function select(id) {
        $state.go('grounding:preview', {id: id, type: 'audit'});
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
        ApiService.storeAuditList({
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