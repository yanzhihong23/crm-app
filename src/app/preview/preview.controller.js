(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('PreviewController', PreviewController);

  /** @ngInject */
  function PreviewController($state) {
    var vm = this;

    vm.submit = submit;

    function submit() {
      $state.go('rights:result');
    }

  }
})();
