(function() {
  'use strict';

  angular
    .module('crmApp')
    .service('UserService', UserService);

  /** @ngInject */
  function UserService(localStorageService, $state, $rootScope, utils, JsBridgeService) {
    
  	this.setUser = function(user) {
      $rootScope.user = user;
      localStorageService.set('user', user);

      JsBridgeService.send({userId: user.userId});

      $rootScope.$broadcast('login:succ');
    };

    this.getUser = function() {
      return localStorageService.get('user');
    };

    this.getUserId = function() {
      return this.getUser().userId;
    };

    this.logout = function() {
      var userId = $rootScope.user.userId;

      $rootScope.user = null;
      localStorageService.clearAll();
      
      utils.disableBack();
      $state.go('login');

      JsBridgeService.send({
        type: 'logout',
        userId: userId
      });
    };
  }
})();
