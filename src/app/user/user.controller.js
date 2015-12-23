(function() {
  'use strict';

  angular
    .module('crmApp')
    .controller('UserController', UserController);

  /** @ngInject */
  function UserController($log, $state, $rootScope, UserService, ApiService, $ionicNavBarDelegate) {
    var vm = this;

    vm.info = $rootScope.user;
    vm.info.canAddAnnouncemnet = vm.info.roleId === 1;

    vm.logout = function() {
      UserService.logout();
    };
  }
})();
