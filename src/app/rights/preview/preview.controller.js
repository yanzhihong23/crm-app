(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('RightsPreviewController', RightsPreviewController);

  /** @ngInject */
  function RightsPreviewController($rootScope, $log, $state, $stateParams, $filter, ApiService, localStorageService, UserService, RightsApplyService, FormatService, AreaService, utils) {
    var vm = this, 
        id = $stateParams.id, 
        type = $stateParams.type,
        user = UserService.getUser();

    vm.id = id;
    vm.type = type;
    vm.user = user;
    vm.title = id ? '申请信息详情' : '申请信息确认';

    vm.submit = submit;
    vm.audit = audit;

    init();

    function init() {
      if(!id) { // add new
        vm.info = RightsApplyService.info;
      } else {
        if(/audit/.test(type)) {
          getDetail();
        } else {
          // data saved in result page
          vm.info = localStorageService.get('rightsApplyPreview');
        }
      }
    }

    function getDetail() {
      ApiService.rightsApplyDetail({id: $stateParams.id}).success(function(data) {
        if(data.flag === 1) {
          vm.info = FormatService.applyInfoFormat(data.data.result);
        } else {
          $log.error('get rights apply detail error');
        }
      });
    }

    function submit() {
      
      vm.info.userId = user.userId;
      ApiService.addRightsApply(vm.info).success(function(data) {
        if(data.flag === 1) {
          $rootScope.$broadcast('reload:list:apply:rights');
          var id = data.data.applyStoreId,
              type = vm.info.reApply ? 'reApply' : 'new';

          RightsApplyService.reset();
          AreaService.reset();

          $state.go('rights:result', {id: id, type: type});
        } else {
          $log.error('add rights apply error');
        }
      });
    }

    function audit(status) {
      var content;
      if(user.roleId === 4) {
        content = '请再次确认收到' + vm.info.realname + '的付款金额' + $filter('currency')(vm.info.payAmount, '￥');
      } else {
        content = '请再次确认';
      }

      utils.confirm({
        content: content,
        onOk: function() {
          doAudit(status);
        }
      });
    }

    function doAudit(status) {
      ApiService.rightsAudit({
        userId: user.userId + '',
        roleId: user.roleId + '',
        status: status + '',
        storeId: id + ''
      }).success(function(data) {
        if(data.flag === 1) {
          $rootScope.$broadcast('reload:list:audit:rights');
          $state.go('list:audit:rights', {},{reload: true});
        } else {
          $log.error('rights audit error');
        }
      });
    }

  }
})();
