(function() {
  'use strict';

  angular
    .module('crmApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $ionicLoading, utils, AppService) {
    $rootScope.$on('loading:show', function() {
      $ionicLoading.show();
    });

  	$rootScope.$on('loading:hide', function() {
  	  $ionicLoading.hide();
  	});

    $log.debug('runBlock end');
  }

})();
