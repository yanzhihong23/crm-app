(function() {
  'use strict';

  angular
    .module('crmApp')
    .service('UserService', UserService);

  /** @ngInject */
  function UserService(localStorageService, $state, $rootScope) {
    
  	this.setUser = function(user) {
      $rootScope.user = user;
      localStorageService.set('user', user);
    };

    this.getUser = function() {
      return localStorageService.get('user');
    };

    this.getUserId = function() {
      return this.getUser().userId;
    };

    this.logout = function() {
      localStorageService.clearAll();
      $state.go('login');
    };
  }
})();
