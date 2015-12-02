(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('AccountAddController', AccountAddController);

  /** @ngInject */
  function AccountAddController($state, utils) {
    var vm = this;

    vm.submit = submit;

    function submit() {
      utils.confirm({
        content: '确认提交该店铺地址申请',
        onOk: function() {
          
        }
      })
    }

  }
})();
