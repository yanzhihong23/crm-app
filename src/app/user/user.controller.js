(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('UserController', UserController);

  /** @ngInject */
  function UserController($log, $state, UserService, ApiService, $ionicNavBarDelegate) {
    var vm = this;

    vm.info = UserService.getUser();

    vm.logout = function() {
      UserService.logout();
    };
  }
})();
