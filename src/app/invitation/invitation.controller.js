(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('InvitationController', InvitationController);

  /** @ngInject */
  function InvitationController($state, $ionicActionSheet, utils) {
    var vm = this;

    vm.invitation = {};

    vm.save = save;
    vm.showApplyRoleAction = showApplyRoleAction;
    vm.showStatusAction = showStatusAction;

    function showApplyRoleAction() {
      var applyRoleAction = $ionicActionSheet.show({
        buttons: [
         { text: '经销商' },
         { text: '小店' }
        ],
        // destructiveText: 'Delete',
        titleText: '选择申请角色',
        cancelText: '取消',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
         return true;
        }
      });
    }

    function showStatusAction() {
      var statusAction = $ionicActionSheet.show({
        buttons: [
         { text: '已邀约' },
         { text: '已到访' }
        ],
        // destructiveText: 'Delete',
        titleText: '选择用户状态',
        cancelText: '取消',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
         return true;
        }
      });
    }


    function save() {

    }

  }
})();
