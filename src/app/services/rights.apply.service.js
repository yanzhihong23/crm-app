(function() {
  'use strict';

  angular
    .module('crmApp')
    .service('RightsApplyService', RightsApplyService);

  /** @ngInject */
  function RightsApplyService($log) {
    this.info = {};

    $log.debug('RightsApplyService end');
    
  }
})();
