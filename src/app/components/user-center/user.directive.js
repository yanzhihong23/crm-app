(function() {
  'use strict';

  angular
    .module('crmApp')
    .directive('userCenter', userCenter);

  /** @ngInject */
  function userCenter() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/user-center/user-center.html',
      scope: {},
      controller: ['$rootScope', '$ionicSideMenuDelegate', 'UserService', '$state', function($rootScope, $ionicSideMenuDelegate, UserService, $state) {
        var vm = this;

        init();

        function init() {
          if($rootScope.user) {
            vm.info = $rootScope.user;
            vm.info.canAddAnnouncemnet = vm.info.roleId === 1;
          }
        }

        vm.goToState = function(state) {
          $ionicSideMenuDelegate.toggleLeft();
          $state.go(state);
        };

        vm.logout = function() {
          $ionicSideMenuDelegate.toggleLeft();
          UserService.logout();
        };

        $rootScope.$on('login:succ', function() {
          init();
        });
      }],
      controllerAs: 'user'
    }

    return directive;
  }

})();