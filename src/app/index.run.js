(function() {
  'use strict';

  angular
    .module('crmApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $ionicLoading, $location, $state, utils, UserService, JsBridgeService, PATTERN) {
    // init js bridge
    JsBridgeService.init();

    $rootScope.$on('loading:show', function() {
      $ionicLoading.show();
    });

  	$rootScope.$on('loading:hide', function() {
  	  $ionicLoading.hide();
  	});

    var user = UserService.getUser();
    $rootScope.user = $rootScope.user || user;

    $rootScope.pattern = PATTERN;

    $rootScope.$on('$stateChangeStart', function(evt, toState, fromState, fromParams) {
      switch(toState.name) {
        case 'login':
          if($rootScope.user) {
            evt.preventDefault();
          }
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

    $rootScope.$on('storeInfoError', function(evt, msg) {
      utils.alert({
        title: '出错了~',
        content: msg
      });
    });

    $rootScope.logout = function() {
      $log.debug('logout');

      $rootScope.user = null;
      UserService.logout();
    };

    $rootScope.$ionicGoBack = function() {
      var deep = -1, isAndroid = ionic.Platform.isAndroid();
      if($state.current.name === 'rights:result') {
        var type = $state.params.type;
        if(type === 'reApply') {
          deep = -6;
        } else if(type === 'new') {
          deep = -5;
        }
      } else if(isAndroid && $state.current.name === 'home') {
        JsBridgeService.exit();
        return;
      }

      utils.goBack(deep);
    };

    document.addEventListener('backbutton', function() {
      alert('back');
    });


    $log.debug('runBlock end');
  }

})();
