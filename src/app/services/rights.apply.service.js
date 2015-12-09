(function() {
  'use strict';

  angular
    .module('crmApp')
    .service('RightsApplyService', RightsApplyService);

  /** @ngInject */
  function RightsApplyService($log) {
    this.info = {};

    this.reset = function() {
      this.info = {};
    };

    $log.debug('RightsApplyService end');
    
  }
})();
