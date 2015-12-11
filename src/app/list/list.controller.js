(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('ListController', ListController)
    .controller('RightsApplyListController', RightsApplyListController)
    .controller('RightsAuditListController', RightsAuditListController)
    .controller('ClientListController', ClientListController)
    .controller('InvitationListController', InvitationListController);

  /** @ngInject */
  function ListController($log, $state, $stateParams, $scope, ApiService) {
    var vm = this, type = $stateParams.type, addState, detailState;

    vm.status = 0;

    switch(type) {
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

  function RightsApplyListController($log, $state, $scope, $rootScope, ApiService, UserService, RightsApplyService) {
    var vm = this, pageIndex, itemsPerPage, userId = UserService.getUserId();

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

  function ClientListController($log, $scope, $rootScope, $state, ApiService, UserService) {
    var vm = this, pageIndex, itemsPerPage;

    vm.doRefresh = init;
    vm.loadMore = load;

    init();

    $rootScope.$on('reload:client:list', function() {
      init();
    });

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
      $log.debug('init');
      pageIndex = 1;
      itemsPerPage = 10;
      vm.map = {};
      vm.hasMoreData = false;
      load();
    }

    function load() {
      $log.debug('load');
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
