(function() {
  'use strict';

  angular
    .module('crmApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $ionicLoading, utils, UserService) {
    $rootScope.$on('loading:show', function() {
      $ionicLoading.show();
    });

  	$rootScope.$on('loading:hide', function() {
  	  $ionicLoading.hide();
  	});

    var user = UserService.getUser();
    $rootScope.user = $rootScope.user || user;

    $rootScope.$on('$stateChangeStart', function(evt, toState, fromState, fromParams) {
      switch(toState.name) {
        case 'login':
          break;
        default:
          if(!$rootScope.user) {
            evt.preventDefault();
            $state.go('login');
          }
      }
    });

    $rootScope.$on('$stateChangeSuccess', function(evt, toState, fromState, fromParams) {
      // reset scroll
      document.documentElement.scrollTop = document.body.scrollTop = 0;
      document.documentElement.scrollLeft = document.body.scrollLeft = 0;
    });

    $rootScope.logout = function() {
      $log.debug('logout');

      $rootScope.user = null;
      UserService.logout();
    };

    $log.debug('runBlock end');
  }

})();
