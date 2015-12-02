(function() {
  'use strict';

  angular
    .module('crmApp')
    .service('AppService', AppService);

  /** @ngInject */
  function AppService($location, localStorageService, utils) {
    
  	this.setUser = function(user) {
      localStorageService.set('user', user);
    };

    this.getUser = function() {
      return localStorageService.get('user');
    };
  }
})();
