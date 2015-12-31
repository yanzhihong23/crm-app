(function() {
  'use strict';

  angular
    .module('crmApp')
    .service('RightsApplyService', RightsApplyService);

  /** @ngInject */
  function RightsApplyService($log) {
    var vm = this;

    this.applyTypes = [
      { text: '经销权', id: 0 },
      { text: '开店权', id: 1 }
    ];

    this.info = {};

    this.reset = function() {
      this.info = {};
    };

    this.setApplyType = function(id) {
      this.applyTypes.forEach(function(obj) {
        if(obj.id === id) {
          vm.info.applyType = obj;
          return;
        }
      });
    };

    $log.debug('RightsApplyService end');
    
  }
})();
