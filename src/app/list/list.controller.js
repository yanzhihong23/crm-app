(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('ClientListController', ClientListController)
    .controller('InvitationListController', InvitationListController);

  /** @ngInject */
  function ClientListController($log, $scope, $rootScope, $state, ApiService, UserService) {
    var vm = this, pageIndex, itemsPerPage;

    vm.doRefresh = init;
    vm.loadMore = load;

    init();

    $rootScope.$on('reload:client:list', function() {
      init();
    });

    function init() {
      pageIndex = 1;
      itemsPerPage = 10;
      vm.map = {};
      vm.hasMoreData = true;
      load();
    }

    function load() {
      ApiService.clientList({
        userId: UserService.getUserId(),
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
              name: obj.inviteuserName,
              applyRole: obj.applyRole,
              date: obj.createDate,
              id: obj.inviteUserid
            };

            if(!vm.map[obj.createDate]) {
              vm.map[obj.createDate] = [];
            }

            vm.map[obj.createDate].push(item);
          });
        }
      }).finally(function() {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });

      pageIndex++;
    }
  }

  function InvitationListController($log, $scope, $rootScope, $state, ApiService, UserService) {
    var vm = this, pageIndex, itemsPerPage;

    vm.status = 0;

    vm.doRefresh = init;
    vm.loadMore = load;

    $scope.$watch(function() {
      return vm.status;
    }, function(val, old) {
      init();
    });

    $rootScope.$on('reload:invitation:list', function() {
      init();
    });

    function init() {
      pageIndex = 1;
      itemsPerPage = 10;
      vm.map = {};
      vm.hasMoreData = false;
      load();
    }

    function load() {
      ApiService.invitedList({
        userId: UserService.getUserId(),
        pageIndex: pageIndex,
        itemsPerPage: itemsPerPage,
        status: vm.status
      }).success(function(data) {
        if(data.flag === 1) {
          var result = data.data.result;
          if(result.length < itemsPerPage) {
            vm.hasMoreData = false;
          }

          // data format
          result.forEach(function(obj) {
            var item = {
              name: obj.inviteuserName,
              applyRole: obj.applyRole,
              phone: obj.inviteuserMobile,
              date: obj.createDate,
              id: obj.inviteUserid
            };

            if(!vm.map[obj.createDate]) {
              vm.map[obj.createDate] = [];
            }

            vm.map[obj.createDate].push(item);
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
