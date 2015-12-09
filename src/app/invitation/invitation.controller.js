(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('InvitationController', InvitationController);

  /** @ngInject */
  function InvitationController($state, $stateParams, $rootScope, $ionicActionSheet, ApiService, UserService, utils) {
    var vm = this, 
        id = $stateParams.id,
        userId = UserService.getUserId(),
        applyRoles = [{ text: '经销商', id: 0 }, { text: '小店', id: 1 }],
        statusList = [{ text: '已邀约', id: 0 }, { text: '已到访', id: 1 }];

    vm.title = !id ? '添加邀约' : '邀约详情';

    vm.save = save;
    vm.showApplyRoleAction = showApplyRoleAction;
    vm.showStatusAction = showStatusAction;

    init();

    function showApplyRoleAction() {
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

    function showStatusAction() {
      var statusAction = $ionicActionSheet.show({
        buttons: statusList,
        // destructiveText: 'Delete',
        titleText: '选择用户状态',
        cancelText: '取消',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          vm.info.status = statusList[index];
          return true;
        }
      });
    }

    function init() {
      if(id) {
        ApiService.invitation({id: id}).success(function(data) {
          if(data.flag === 1) {
            var result = data.data.result;

            vm.info = {
              id: id,
              name: result.inviteuserName,
              phone: result.inviteuserMobile,
              visitDate: result.visitTime,
              applyRole: {
                id: result.applyRole
              },
              status: {
                id: result.userState
              },
              remark: result.remark 
            };
          } else {
            $log.error('get invitation error');
          }
        })
      } else {
        vm.info = {
          applyRole: applyRoles[0],
          status: statusList[0]
        };
      }
    }


    function save() {
      if(id) { // update
        vm.info.id = id;
        vm.info.userId = userId;
        ApiService.updateInvitation(vm.info).success(function(data) {
          if(data.flag === 1) {
            $rootScope.$broadcast('reload:invitation:list');
            utils.goBack();
          } else {
            $log.error('update invitation error');
          }
        });
      } else { // add
        vm.info.userId = userId;
        ApiService.addInvitation(vm.info).success(function(data) {
          if(data.flag === 1) {
            $rootScope.$broadcast('reload:invitation:list');
            utils.goBack();
          } else {
            $log.error('add invitation error');
          }
        });
      }
    }

  }
})();
