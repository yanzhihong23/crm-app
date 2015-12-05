(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('ListController', ListController)
    .controller('RightsApplyListController', RightsApplyListController)
    .controller('RightsAuditListController', RightsAuditListController)
    .controller('AccountApplyListController', AccountApplyListController)
    .controller('GroundingApplyListController', GroundingApplyListController)
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

  function RightsApplyListController($log, $state, $scope, ApiService, UserService) {
    var vm = this, pageIndex, itemsPerPage, userId = UserService.getUserId();

    vm.status = 0;
    vm.doRefresh = init;
    vm.loadMore = load;

    $scope.$watch(function() {
      return vm.status;
    }, function(val, old) {
      init();
    });

    // init();

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

    $scope.$watch(function() {
      return vm.status;
    }, function(val, old) {
      init();
    });

    $rootScope.$on('reload:list:audit:rights', function() {
      init();
    });

    // init();

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

  function ClientListController($log, $scope, $state, ApiService, UserService) {
    var vm = this, pageIndex, itemsPerPage;

    vm.doRefresh = init;
    vm.loadMore = load;

    init();

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

  function InvitationListController($log, $scope, $state, ApiService, UserService) {
    var vm = this, pageIndex, itemsPerPage;

    vm.status = 0;

    vm.doRefresh = init;
    vm.loadMore = load;

    $scope.$watch(function() {
      return vm.status;
    }, function(val, old) {
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
        itemsPerPage: itemsPerPage
      }).success(function(data) {
        if(data.flag === 1) {
          var result = data.data.result;
          if(result.length < itemsPerPage) {
            vm.hasMoreData = false;
          }

          // data format
          result.filter(function(obj) {
            // return obj.userState == vm.status;
            return true;
          }).forEach(function(obj) {
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
