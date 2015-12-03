(function() {
  'use strict';

  angular
    .module('crmApp')
    .service('UserService', UserService);

  /** @ngInject */
  function UserService($location, localStorageService, utils) {
    
  	this.setUser = function(user) {
      localStorageService.set('user', user);
    };

    this.getUser = function() {
      return localStorageService.get('user');
    };
  }
})();
