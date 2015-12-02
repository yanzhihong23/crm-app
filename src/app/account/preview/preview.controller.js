(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('AccountPreviewController', AccountPreviewController);

  /** @ngInject */
  function AccountPreviewController($state) {
    var vm = this;

    vm.submit = submit;

    function submit() {
      $state.go('rights:result');
    }

  }
})();
