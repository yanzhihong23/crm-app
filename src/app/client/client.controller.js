(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('ClientAddController', ClientAddController)
    .controller('ClientPreviewController', ClientPreviewController);

  /** @ngInject */
  function ClientAddController($log, $state, $ionicActionSheet, ApiService, UserService, utils) {
    var vm = this, 
        applyRoles = [
          { text: '经销商', id: 0 },
          { text: '小店', id: 1 }
        ];

    vm.info = {
      applyRole: applyRoles[0]
    };

    vm.save = save;
    vm.showApplyRoleAction = showApplyRoleAction;

    function showApplyRoleAction() {
      $log.debug(1)
      var applyRoleAction = $ionicActionSheet.show({
        buttons: applyRoles,
        // destructiveText: 'Delete',
        titleText: '选择申请角色',
        cancelText: '取消',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          vm.info.applyRole = applyRoles[index];
          return true;
        }
      });
    }

    function save() {
      vm.info.userId = UserService.getUserId();
      ApiService.addClient(vm.info).success(function(data) {
        if(data.flag === 1) {
          utils.disableBack();
          $state.go('list:client', null, {reload: true});
        } else {
          $log.error('add client error');
        }
      });
    }

  }

  function ClientPreviewController($log, $state, $stateParams, UserService, ApiService, utils) {
    var vm = this, id = $stateParams.id;

    ApiService.client({id: id}).success(function(data) {
      if(data.flag === 1) {
        var obj = data.data.result;
        vm.info = {
          name: obj.inviteuserName,
          idNo: obj.personNumber,
          phone: obj.inviteuserMobile,
          applyRole: obj.applyRole == 0 ? '经销商' : '小店'
        };
      } else {
        $log.error('get client info error');
      }
    });
  }
})();
