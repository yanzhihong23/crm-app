(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('AccountPreviewController', AccountPreviewController);

  /** @ngInject */
  function AccountPreviewController($log, $rootScope, $scope, $state, $stateParams, $ionicModal, ApiService, UserService, utils) {
    var vm = this, id = $stateParams.id,
        isAudit = $stateParams.type === 'audit',
        user = UserService.getUser(),
        mapModal;

    vm.isAudit = isAudit;
    vm.user = user;
    vm.audit = audit;
    vm.modify = modify;
    vm.showMap = showMap;
    vm.hideModal = hideModal;

    init();

    function init() {
      ApiService.accountApplyDetail({id: id}).success(function(data) {
        if(data.flag === 1) {
          var detail = data.data.detail;
          vm.info = {
            companyName: detail.companyName,
            realname: detail.applyName,
            idNo: detail.personNum,
            phone: detail.phone,
            province: detail.capitalName,
            city: detail.cityName,
            district: detail.districtName,
            districtId: detail.district,
            street: detail.streetName,
            address: detail.detailAddress,
            village: detail.village,

            households: detail.households,
            point: {
              lat: detail.latitude,
              lng: detail.longitude
            },

            remark: detail.addressAuditOpinion,
            status: detail.addressAuditStatus,
            statusStr: detail.addressAuditStatus === 1 ? '通过' : '未通过'
          };
        }
      });
    }

    function audit(status) {
      ApiService.addrAudit({
        userId: user.userId,
        storeId: id,
        status: status,
        remark: vm.remark
      }).success(function(data) {
        if(data.flag === 1) {
          $rootScope.$broadcast('reload:list:account:audit');
          utils.goBack();
        } else {

        }
      });
    }

    function modify() {
      $state.go('account:add', {type: 'update', id: id});
    }

    function showMap() {
      $ionicModal.fromTemplateUrl('app/components/map/map.preview.modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        mapModal = modal;
        modal.show();
      });
    }

    function hideModal() {
      mapModal.remove();
    }

  }
})();
