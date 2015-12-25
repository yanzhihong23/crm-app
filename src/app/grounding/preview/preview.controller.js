(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('PreviewController', PreviewController);

  /** @ngInject */
  function PreviewController($log, ApiService, $scope, $rootScope, $state, $stateParams, $ionicModal, UserService, utils) {
    var vm = this,
        picModal,
        id = $stateParams.id,
        user = UserService.getUser();

    vm.isAudit = $stateParams.type === 'audit';

    vm.roleId = user.roleId;
    vm.audit = audit;
    vm.modify = modify;
    vm.showPic = showPic;
    vm.hide = hide;

    init();

    function init() {
      ApiService.shopDetail({id: id}).success(function(data) {
        if(data.flag === 1) {
          vm.imgs = data.data.imgs.map(function(obj) {
            return obj.imgUrl;
          });

          var detail = data.data.detail;
          var statusStr = '';
          if(detail.imgsAuditStatus == 1) {
            statusStr = '审核通过';
          } else if(detail.imgsAuditStatus == -1) {
            statusStr = '审核不通过';
          }

          vm.info = {
            status: detail.imgsAuditStatus,
            statusStr: statusStr,
            remark: detail.imgsAuditOpinion
          };

          vm.user = {
            username: detail.username,
            password: detail.password,
            shopName: detail.shopName,
            shopAlipay: detail.payAlipayNum
          };

        }
      });
    }

    function audit(status) {
      ApiService.picAudit({
        userId: user.userId,
        shopId: id,
        status: status,
        remark: vm.remark
      }).success(function(data) {
        if(data.flag === 1) {
          $rootScope.$broadcast('reload:list:grounding:audit');
          utils.goBack();
        } else {

        }
      });
    }

    function modify() {
      $state.go('grounding:upload', {type: 'update', id: id});
    }

    function showPic(index) {
      vm.pic = vm.imgs[index];
      $ionicModal.fromTemplateUrl('app/grounding/preview/pic.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        picModal = modal;
        picModal.show();
      });
    }

    function hide() {
      picModal.hide();
    }
    
  }
})();
