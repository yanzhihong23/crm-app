(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('RightsPreviewController', RightsPreviewController);

  /** @ngInject */
  function RightsPreviewController($state) {
    var vm = this;

    vm.submit = submit;

    function submit() {
      $state.go('rights:result');
    }

  }
})();
