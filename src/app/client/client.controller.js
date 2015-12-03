(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('ClientAddController', ClientAddController)
    .controller('ClientPreviewController', ClientPreviewController);

  /** @ngInject */
  function ClientAddController($state, $ionicActionSheet, utils) {
    var vm = this;

    vm.save = save;
    vm.showApplyRoleAction = showApplyRoleAction;

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

    function save() {
      
    }

  }

  function ClientPreviewController($state, utils) {
    var vm = this;

  }
})();
