(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('RightsAddController', RightsAddController);

  /** @ngInject */
  function RightsAddController($ionicActionSheet, $state) {
    var vm = this;

    vm.showApplyTypeAction = showApplyTypeAction;
    vm.showApplicantTypeAction = showApplicantTypeAction;
    vm.next = next;

    function showApplyTypeAction() {
      var applyTypeAction = $ionicActionSheet.show({
        buttons: [
         { text: '经销权' },
         { text: '开店权' }
        ],
        // destructiveText: 'Delete',
        titleText: '选择申请类型',
        cancelText: '取消',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
         return true;
        }
      });
    }

    function showApplicantTypeAction() {
      var applicantTypeAction = $ionicActionSheet.show({
        buttons: [
         { text: '个人' },
         { text: '公司' }
        ],
        // destructiveText: 'Delete',
        titleText: '选择申请人类别',
        cancelText: '取消',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
         return true;
        }
      });
    }

    function next() {
      $state.go('rights:input');
    }
  }
})();
